/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import BudgetChart from "../components/BudgetChart";
import Spinner from "../components/Spinner";
import GMap from "../components/GMap";
import DashboardCard from "../components/DashboardCard";
import Calendar from '../components/Calendar';
import 'react-day-picker/dist/style.css';
import ActivityTask from "../components/ActivityTask";
import { useItineraryData } from '../hooks/useItineraryData';
import instance from '../config/axios';
import { addExpense, addPackings, addTasks, deleteExpense, deletePacking, updateBudget, updateExpense, updatePacking, updateTask } from "../hooks/useApiCalls";

const Dashboard = () => {
  const { data, loading, error } = useItineraryData();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const [editingBudget, setEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(0);

  const [expenses, setExpenses] = useState([]);
  const [tempExpense, setTempExpense] = useState({ title: '', amount: '' });
  const [editingExpense, setEditingExpense] = useState(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '' });
  const [totalSpent, setTotalSpent] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripStatus, setTripStatus] = useState({ text: '', days: 0 });
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });

  const [newTask, setNewTask] = useState({ name: '', date: '', descriptions: [''] });
  const [activities, setActivities] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [packingItems, setPackingItems] = useState([]);
  const [isAddingPackingItem, setIsAddingPackingItem] = useState(false);
  const [editingPackingItem, setEditingPackingItem] = useState(null);
  const [newPackingItem, setNewPackingItem] = useState({ item: '' });

  // Move initialization logic to useEffect
  useEffect(() => {
    if (data && data.length > 0) {
      const initialItinerary = data[0];
      setSelectedItinerary(initialItinerary);
      setTempBudget(initialItinerary.budget);
      setExpenses(initialItinerary.expenses);
      setTotalSpent(initialItinerary.expenses.reduce((acc, curr) => acc + curr.amount, 0));
      setDestination({
        latitude: initialItinerary.destination?.coordinates?.latitude || 0,
        longitude: initialItinerary.destination?.coordinates?.longitude || 0
      });
      setActivities(initialItinerary.activities || []);
      setPackingItems(initialItinerary.packings || []);

      // Set date range
      if (initialItinerary.startDate && initialItinerary.endDate) {
        const startDateObj = new Date(initialItinerary.startDate);
        const endDateObj = new Date(initialItinerary.endDate);
        setRange({
          from: startDateObj,
          to: endDateObj
        });
        setStartDate(startDateObj);
        setEndDate(endDateObj);
      }
    }
  }, [data]);

  const calculateTripStatus = useCallback(() => {
    if (!startDate || !endDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    // Check if today is start date or end date
    if (today.getTime() === start.getTime()) {
      setTripStatus({
        text: 'Trip starts today!',
        days: 0
      });
      return;
    }

    if (today.getTime() === end.getTime()) {
      setTripStatus({
        text: 'Trip ends today!',
        days: 0
      });
      return;
    }

    // Calculate differences in days
    const daysTillStart = Math.floor((start - today) / (1000 * 60 * 60 * 24));
    const daysTillEnd = Math.floor((end - today) / (1000 * 60 * 60 * 24));

    if (daysTillStart > 0) {
      setTripStatus({
        text: 'Days to start',
        days: daysTillStart
      });
    } else if (daysTillEnd >= 0) {
      setTripStatus({
        text: 'Days to end',
        days: daysTillEnd
      });
    } else {
      setTripStatus({
        text: 'Trip completed',
        days: 0
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    calculateTripStatus();
  }, [calculateTripStatus]);

  // Fix budget save handler
  const handleBudgetSave = async () => {
    if (!selectedItinerary?._id) return;

    try {
      await updateBudget(selectedItinerary._id, tempBudget);
      console.log('Budget updated successfully!');
      setEditingBudget(false);
    } catch (err) {
      console.error('Failed to update budget:', err);
    }
  };

  // Fix itinerary selection
  const handleItinerarySelect = useCallback((id) => {
    const selected = data?.find(it => it._id === id);
    if (selected) {
      setSelectedItinerary(selected);
      setTempBudget(selected.budget);
      setExpenses(selected.expenses);
      setTotalSpent(selected.expenses.reduce((acc, curr) => acc + curr.amount, 0));

      // Update dates
      if (selected.startDate && selected.endDate) {
        const startDateObj = new Date(selected.startDate);
        const endDateObj = new Date(selected.endDate);
        setRange({ from: startDateObj, to: endDateObj });
        setStartDate(startDateObj);
        setEndDate(endDateObj);
      } else {
        setRange({ from: undefined, to: undefined });
        setStartDate(null);
        setEndDate(null);
      }

      // Update destination
      setDestination({
        latitude: selected.destination?.coordinates?.latitude || 0,
        longitude: selected.destination?.coordinates?.longitude || 0
      });

      // Update activities and packing list
      setActivities(selected.activities || []);
      setPackingItems(selected.packings || []);

      setShowDropdown(false);
    }
  }, [data]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleUpdateExpense = async (expenseId) => {
    try {
      if (!tempExpense.title || !tempExpense.amount) return;

      const response = await updateExpense(expenseId, tempExpense);
      console.log('💰 Expense updated.');

      // Update local state with the updated expense
      setExpenses(prevExpenses =>
        prevExpenses.map(expense =>
          expense._id === expenseId ? response.data : expense
        )
      );

      // Update total spent
      setTotalSpent(prev => {
        const oldExpense = expenses.find(e => e._id === expenseId);
        return prev - oldExpense.amount + parseFloat(response.data.amount);
      });

      setTempExpense({ title: '', amount: '' });
      setEditingExpense(null);
    } catch (err) {
      console.error('❌ Failed to update expense:', err);
    }
  };

  const updatePackingItemField = async (itemId, newName) => {
    try {
      const item = packingItems.find(i => i._id === itemId);
      if (!item) return;
      await updatePacking(itemId, { ...item, name: newName });
      // Update local state after successful API call
      setPackingItems(prevItems =>
        prevItems.map(i => i._id === itemId ? { ...i, item: newName } : i)
      );
    } catch (err) {
      console.error('Failed to update packing item:', err);
    }
  };

  const handlePackingEdit = (itemId) => {
    if (!itemId) return;
    setEditingPackingItem(itemId);
  };

  const handleExpenseEdit = useCallback((expense) => {
    if (!expense?._id) return;
    setEditingExpense(expense._id);
    setTempExpense({ title: expense.title, amount: expense.amount });
  }, []);

  const handleDeleteExpense = useCallback(async (expense) => {
    if (!expense?._id) return;
    try {
      await deleteExpense(expense._id);
      console.log('🗑️ Expense deleted');

      // First update expenses
      setExpenses(prevExpenses => prevExpenses.filter(e => e._id !== expense._id));

      // Then update total spent
      setTotalSpent(prev => prev - expense.amount);

    } catch (err) {
      console.error('❌ Failed to delete expense:', err);
    }
  }, []);

  const handleAddExpense = useCallback(async () => {
    if (!newExpense.title || !newExpense.amount) return;

    try {
      const response = await addExpense({
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        itinerary: selectedItinerary._id
      });

      console.log('✨ New expense added.');

      // Update local state with the new expense
      setExpenses(prevExpenses => [...prevExpenses, response.data]);

      // Update total spent
      setTotalSpent(prev => prev + parseFloat(newExpense.amount));

      setNewExpense({ title: '', amount: '' });
      setIsAddingExpense(false);
    } catch (err) {
      console.error('❌ Failed to add expense:', err);
    }
  }, [newExpense, selectedItinerary?._id]);

  const handleAddPackingItem = async () => {
    try {
      if (newPackingItem.item) {
        const response = await addPackings({
          item: newPackingItem.item.trim(),
          itinerary: selectedItinerary._id
        });
        console.log('📦 New packing item added.');
        // Update local state with the new item from the response
        setPackingItems(prevItems => [...prevItems, response.data]);
        setNewPackingItem({ item: '' });
        setIsAddingPackingItem(false);
      }
    } catch (e) {
      console.error('❌ Failed to add packing item:', e);
    }
  }

  const handleCheckboxChange = async (itemId, currentStatus) => {
    try {
      await updatePacking(itemId, { hasTaken: !currentStatus });
      console.log('Packing item status updated successfully!');
      // Update local state after successful API call
      setPackingItems(prevItems =>
        prevItems.map(i => i._id === itemId ? { ...i, hasTaken: !currentStatus } : i)
      );
    } catch (err) {
      console.error('Failed to update packing item:', err);
    }
  };

  const handleDeletePackingItem = async (itemId) => {
    try {
      await deletePacking(itemId);
      const deletedItem = packingItems.find(i => i._id === itemId);
      console.log('🗑️ Packing item deleted.');
      // Update local state after successful API call
      setPackingItems(prevItems => prevItems.filter(i => i._id !== itemId));
    } catch (err) {
      console.error('❌ Failed to delete packing item:', err);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      if (!updatedTask._id) {
        console.error('Task ID is missing');
        return;
      }

      await updateTask(updatedTask._id, updatedTask);
      console.log('📝 Task updated.');
      // Update local state after successful update
      setActivities(prevActivities =>
        prevActivities.map(activity =>
          activity._id === updatedTask._id ? updatedTask : activity
        )
      );
    } catch (err) {
      console.error('❌ Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await instance.delete(`/activities/${taskId}`);
      const deletedTask = activities.find(a => a._id === taskId);
      console.log('🗑️ Task deleted.');
      // Update local state after successful deletion
      setActivities(prevActivities =>
        prevActivities.filter(activity => activity._id !== taskId)
      );
    } catch (err) {
      console.error('❌ Failed to delete task:', err);
    }
  };

  const handleAddTask = async () => {
    if (newTask.name && newTask.date) {
      try {
        const response = await addTasks({
          name: newTask.name,
          date: newTask.date,
          descriptions: newTask.descriptions,
          itinerary: selectedItinerary._id
        });
        console.log('✨ New task added.');
        // Update local state with new task
        setActivities(prevActivities => [...prevActivities, response.data]);
        setNewTask({ name: '', date: '', descriptions: [''] });
        setIsAddingTask(false);
      } catch (err) {
        console.error('❌ Failed to add task:', err);
      }
    }
  };

  const getDayNumber = (date) => {
    if (!startDate || !date) return null;
    const start = new Date(startDate);
    const current = new Date(date);
    // Calculate the difference in days and add 1 to make it 1-based
    const diffTime = Math.abs(current - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  useEffect(() => {
    return () => {
      setEditingExpense(null);
      setEditingPackingItem(null);
    };
  }, []);

  const handleUpdateDates = async (newRange) => {
    if (!selectedItinerary?._id || !newRange.from || !newRange.to) return;

    try {
      await instance.put(`/itineraries/${selectedItinerary._id}`, {
        startDate: newRange.from,
        endDate: newRange.to
      });
      console.log('📅 Trip dates updated.');
      setStartDate(newRange.from);
      setEndDate(newRange.to);
      setRange(newRange);
    } catch (err) {
      console.error('❌ Failed to update dates:', err);
    }
  };

  if (loading) return <div className="flex h-screen justify-center items-center"><Spinner /></div>;
  if (error) return <div className="flex h-screen justify-center text-red-500 items-center">Error: {error}</div>;
  if (!data || data.length === 0) return <div className="flex h-screen justify-center items-center">No itineraries found</div>;

  return (
    <main className="p-8">
      <DashboardNavbar />
      <div className="p-4 mt-8 mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-8 md:grid-cols-2">
          <div className="col-span-1 bg-gray-800 p-6 rounded-3xl shadow-sm text-white lg:col-span-3 overflow-hidden relative">
            <img
              src="https://cdn.pixabay.com/photo/2019/08/12/17/11/asphalt-road-4401704_960_720.jpg"
              alt=""
              className="w-full -translate-x-1/2 -translate-y-1/2 absolute blur-[5px] brightness-50 left-1/2 top-1/2 z-0"
            />
            <div className="flex justify-between items-center mb-4 relative">
              <h2 className="text-xl font-semibold"><i className="fa-paper-plane fa-solid mr-2"></i>YOUR TRIP</h2>
              <span className="relative">
                <span
                  className="bg-gray-700 rounded-full text-white cursor-pointer px-4 py-1"
                  onClick={toggleDropdown}
                >
                  {data?.title || 'Select Trip'} <i className="fa-angle-down fa-solid"></i>
                </span>
                {showDropdown && (
                  <ul className="bg-white rounded-lg shadow-lg text-black absolute mt-2 overflow-hidden z-20">
                    {data.map((it) => (
                      <li
                        key={it._id}
                        className={`cursor-pointer hover:bg-gray-200 px-4 py-2 ${it._id === selectedItinerary._id ? 'bg-gray-100' : ''}`}
                        onClick={() => handleItinerarySelect(it._id)}
                      >
                        {it.title}
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </div>
            <div className="text-2xl font-bold mb-2 relative z-10">
              Hey {selectedItinerary?.user?.name || 'there'} 👋
            </div>
            <div className="text-lg relative z-10">
              {selectedItinerary?.description ? `Welcome To Your "${selectedItinerary?.description}" Adventure!` : 'Select a trip to get started'}
            </div>
            <br />
            <div className="text-sm relative z-10">
              <span className="text-5xl font-bold">{selectedItinerary?.title}</span>
            </div>
            <div className="text-gray-400 text-sm absolute bottom-4 z-10">
              The journey of a thousand miles begins with planning and preparation.
            </div>
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-4">
            <DashboardCard
              heading={"BUDGET"}
              icon={"fa-chart-pie fa-solid"}
              bg={"bg-[#f5f5f5]"}
            >
              {(isExpanded) => (
                <div>
                  <div className="flex justify-between items-center">
                    <div className="bg-[#c5c5c5] rounded-full text-sm px-2 py-1">
                      Total: {editingBudget && isExpanded ? (
                        <input
                          type="number"
                          value={tempBudget}
                          onChange={(e) => setTempBudget(Number(e.target.value))}
                          onBlur={handleBudgetSave}
                          className="bg-transparent border-none w-24 font-bold outline-none"
                          autoFocus
                        />
                      ) : (
                        <span
                          className="cursor-pointer font-bold"
                          onClick={() => isExpanded && setEditingBudget(true)}
                        >
                          ${tempBudget}
                        </span>
                      )}
                    </div>
                  </div>
                  <BudgetChart
                    totalBudget={tempBudget}
                    totalSpent={totalSpent}
                  />
                </div>
              )}
            </DashboardCard>

            <DashboardCard
              heading={"EXPENSES"}
              icon={"fa-file-invoice fa-solid"}
              bg={"bg-[#f5f5f5]"}
            >
              {(isExpanded) => (
                <>
                  <ul className="max-h-60 overflow-auto space-y-2">
                    {isAddingExpense && (
                      <li className="flex border-b border-b-[#0001] justify-between group items-center py-2">
                        <div className="flex flex-1 gap-0.5 items-center mr-2">
                          <input
                            type="text"
                            placeholder="Item name"
                            value={newExpense.title}
                            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                            className="bg-transparent border-none outline-none w-1/2"
                            onBlur={handleAddExpense}
                            autoFocus
                          />
                          <input
                            type="number"
                            placeholder="Amount"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            className="bg-transparent border-none text-right w-1/2 font-medium outline-none"
                            onBlur={handleAddExpense}
                          />
                        </div>
                      </li>
                    )}
                    {expenses.length === 0 && !isAddingExpense ? (
                      <div className="text-center text-gray-500 py-4">No expenses recorded yet</div>
                    ) : (
                      expenses.map((ex) => (
                        <li
                          key={ex._id}
                          className="flex border-b border-b-[#0001] justify-between group items-center py-2"
                        >
                          {editingExpense === ex._id ? (
                            <div className="flex flex-1 gap-0.5 items-center" onBlur={() => handleUpdateExpense(ex._id)}>
                              <input
                                type="text"
                                value={tempExpense.title || ex.title}
                                onChange={(e) => setTempExpense(prev => ({ ...prev, title: e.target.value }))}
                                className="bg-transparent border-none w-2/3 min-w-0 outline-none truncate"
                                autoFocus
                              />
                              <input
                                type="number"
                                value={tempExpense.amount || ex.amount}
                                onChange={(e) => setTempExpense(prev => ({ ...prev, amount: e.target.value }))}
                                className="bg-transparent border-none text-right w-20 font-medium outline-none"
                              />
                            </div>
                          ) : (
                            <>
                              <span>{ex.title}</span>
                              <div className="flex gap-2 items-center">
                                <span className="font-medium">
                                  ${ex.amount}
                                </span>
                                {isExpanded && (
                                  <div className="flex gap-2 ml-2">
                                    <i
                                      className="cursor-pointer fa-pen-to-square fa-solid hover:text-blue-600"
                                      onClick={() =>
                                        handleExpenseEdit(ex)
                                      }
                                    ></i>
                                    <i
                                      className="cursor-pointer fa-solid fa-trash hover:text-red-600"
                                      onClick={() => handleDeleteExpense(ex)}
                                    ></i>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                  <button
                    className="flex text-gray-800 text-xl absolute bottom-4 cursor-pointer items-center mt-4 py-2"
                    onClick={() => setIsAddingExpense(true)}
                  >
                    <div className='flex bg-gray-800 h-6 justify-center rounded-full text-base text-white w-6 items-center mr-2'>
                      <i className="fa-plus fa-solid"></i>
                    </div>
                    Record
                  </button>
                </>
              )}
            </DashboardCard>
          </div>

          <div className="col-span-2">
            <DashboardCard
              heading={"READINESS"}
              icon={"fa-hourglass-half fa-solid"}
              bg={"bg-blue-100"}
            >
              {(isExpanded) => (
                <div className="flex flex-col items-center">
                  {isExpanded ? (
                    <div className="bg-transparent h-full w-full">
                      <Calendar
                        selected={range}
                        onSelect={(newRange) => {
                          setRange(newRange);
                          if (newRange.from && newRange.to) {
                            handleUpdateDates(newRange);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      {(range.from && range.to) ? (
                        <div className="relative">
                          <Spinner />
                          <div className="text-center -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2">
                            <span className="text-8xl font-bold">{tripStatus.days}</span>
                            <p className="text-center whitespace-nowrap">{tripStatus.text || 'Select dates'}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Click the dots to set trip dates
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </DashboardCard>
          </div>

          <div className="bg-[#f5f5f5] p-6 rounded-3xl shadow-sm lg:col-span-3 relative">
            <h2 className="text-xl font-semibold mb-4">
              <i className="fa-location-crosshairs fa-solid mr-2"></i>
              DESTINATION
            </h2>
            <GMap destinations={destination} />
          </div>

          <div className="col-span-1 lg:col-span-3 min-h-[400px]">
            <DashboardCard
              heading={"DAYS & ACTIVITY"}
              icon={"fa-person-walking fa-solid"}
              bg={"bg-amber-100"}
            >
              {(isExpanded) => (
                <div>
                  <div className="max-h-[360px] overflow-auto pr-2">
                    {isAddingTask && (
                      <div className="bg-white/50 p-4 rounded-lg mb-6">
                        <input
                          type="date"
                          value={newTask.date}
                          onChange={(e) => setNewTask(prev => ({ ...prev, date: e.target.value }))}
                          className="border p-2 rounded w-full mb-2"
                          min={startDate}
                          max={endDate}
                        />
                        <input
                          type="text"
                          placeholder="Task title"
                          value={newTask.name}
                          onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                          className="border p-2 rounded w-full mb-2"
                        />
                        {newTask.descriptions.map((desc, idx) => (
                          <div key={`new-task-desc-${idx}`} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Description"
                              value={desc}
                              onChange={(e) => {
                                const newDesc = [...newTask.descriptions];
                                newDesc[idx] = e.target.value;
                                setNewTask(prev => ({ ...prev, descriptions: newDesc }));
                              }}
                              className="flex-1 border p-2 rounded"
                            />
                            <button
                              onClick={() => {
                                const newDesc = [...newTask.descriptions];
                                if (idx === newTask.descriptions.length - 1) {
                                  newDesc.push('');
                                } else {
                                  newDesc.splice(idx, 1);
                                }
                                setNewTask(prev => ({ ...prev, descriptions: newDesc }));
                              }}
                              className="bg-amber-500 rounded text-white px-3 py-1"
                            >
                              {idx === newTask.descriptions.length - 1 ? '+' : '×'}
                            </button>
                          </div>
                        ))}
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => setIsAddingTask(false)}
                            className="text-gray-600 px-4 py-2"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddTask}
                            className="bg-amber-500 rounded text-white px-4 py-2"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                    {startDate ? (
                      Array.from(new Set(activities.map(task => task.date)))
                        .sort((a, b) => new Date(a) - new Date(b)) // Sort by actual date
                        .map(date => {
                          const dayNumber = getDayNumber(date);
                          return (
                            <div key={date} className="mb-6">
                              <div className="flex gap-4 items-center mb-4">
                                <span className="bg-[#0005] rounded-full font-semibold px-3 py-2">
                                  Day {dayNumber}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {new Date(date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              {activities
                                .filter(task => task.date === date)
                                .map(task => (
                                  <ActivityTask
                                    key={task._id}
                                    task={{
                                      ...task,
                                      title: task.name,
                                      descriptions: task.descriptions || []
                                    }}
                                    isExpanded={isExpanded}
                                    onEdit={handleEditTask}
                                    onDelete={handleDeleteTask}
                                  />
                                ))}
                            </div>
                          );
                        })
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        Please set trip dates first
                      </div>
                    )}
                  </div>
                  <button
                    className="flex text-gray-800 text-xl absolute bottom-4 cursor-pointer items-center mt-4 py-2"
                    onClick={() => setIsAddingTask(true)}
                  >
                    <div className='flex bg-gray-800 h-6 justify-center rounded-full text-base text-yellow-100 w-6 items-center mr-2'>
                      <i className="fa-plus fa-solid"></i>
                    </div>
                    New Activity
                  </button>
                </div>
              )}
            </DashboardCard>
          </div>

          <div className="col-span-2 text-white">
            <DashboardCard
              heading={"PACKING LIST"}
              icon={"fa-clipboard-list fa-solid"}
              bg={"bg-gray-800"}
            >
              {(isExpanded) => (
                <div className="flex flex-col h-full justify-between">
                  <ul className="max-h-[22rem] mb-16 overflow-auto space-y-2">
                    {isAddingPackingItem && (
                      <li className="flex border-b border-b-[#fff2] justify-between items-center py-2">
                        <div className="flex flex-1 gap-4 items-center">
                          <input
                            type="checkbox"
                            className="border-2 border-gray-300 h-6 rounded-full w-6 appearance-none checked:bg-[#f5f5f5] checked:border-gray-500 cursor-pointer"
                            disabled
                          />
                          <input
                            type="text"
                            value={newPackingItem.item}
                            onChange={(e) => setNewPackingItem(prev => ({ ...prev, item: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddPackingItem()}
                            onBlur={() => handleAddPackingItem(newPackingItem)}
                            className="flex-1 bg-transparent border-none text-white outline-none"
                            placeholder="Enter item name"
                            autoFocus
                          />
                        </div>
                      </li>
                    )}
                    {packingItems.length === 0 && !isAddingPackingItem ? (
                      <div className="text-center text-gray-400 py-4">Your packing list is empty</div>
                    ) : (
                      packingItems.map((item) => (
                        <li
                          key={item._id}
                          className="flex border-b border-b-[#fff2] justify-between group hover:bg-white/5 items-center py-2"
                        >
                          <div className="flex flex-1 gap-4 items-center">
                            <input
                              id={`checkbox-${item._id}`}
                              type="checkbox"
                              checked={item.hasTaken}
                              onChange={() => handleCheckboxChange(item._id, item.hasTaken)}
                              className="border-2 border-gray-300 h-6 rounded-full w-6 appearance-none checked:bg-[#f5f5f5] checked:border-gray-500 cursor-pointer"
                            />
                            {editingPackingItem === item._id ? (
                              <input
                                type="text"
                                value={item.item}
                                onChange={(e) => updatePackingItemField(item._id, e.target.value)}
                                onBlur={() => setEditingPackingItem(null)}
                                onKeyDown={(e) => e.key === 'Enter' && setEditingPackingItem(null)}
                                className="flex-1 bg-transparent border-none text-white outline-none"
                                autoFocus
                              />
                            ) : (
                              <label
                                htmlFor={`checkbox-${item._id}`}
                                className={`${item.hasTaken ? 'line-through text-gray-500' : 'text-gray-200'} transition-colors duration-200 flex-1 cursor-pointer`}
                              >
                                {item.item}
                              </label>
                            )}
                          </div>
                          {isExpanded && !editingPackingItem && (
                            <div className="flex duration-200 gap-2 group-hover:opacity-100 opacity-0 transition-all">
                              <i
                                className="cursor-pointer fa-pen-to-square fa-solid hover:text-blue-400"
                                onClick={() => handlePackingEdit(item._id)}
                              ></i>
                              <i
                                className="cursor-pointer fa-solid fa-trash hover:text-red-400"
                                onClick={() => handleDeletePackingItem(item._id)}
                              ></i>
                            </div>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                  <button
                    className="flex text-white text-xl absolute bottom-4 cursor-pointer items-center py-2"
                    onClick={() => setIsAddingPackingItem(true)}
                  >
                    <div className='flex bg-amber-100 h-6 justify-center rounded-full text-base text-gray-900 w-6 items-center mr-2'>
                      <i className="fa-plus fa-solid"></i>
                    </div>
                    New Item
                  </button>
                </div>
              )}
            </DashboardCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(Dashboard); // Memoize the entire component