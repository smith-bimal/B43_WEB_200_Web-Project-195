/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router';
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
import DownloadPDFButton from "../components/DownloadPDFButton";
import PDFErrorBoundary from '../components/PDFErrorBoundary';
import Activities from "../components/Activities";

const Dashboard = () => {
  const { data: allData, loading, error } = useItineraryData();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allData) {
      const filteredData = allData.filter(itinerary => {
        if (!itinerary.endDate) return true;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date(itinerary.endDate);
        endDate.setHours(0, 0, 0, 0);
        
        return endDate >= today;
      });
      
      setData(filteredData);
    }
  }, [allData]);

  useEffect(() => {
    if (data && data.length > 0) {
      const savedItineraryId = localStorage.getItem('selectedItineraryId');
      let initialItinerary;

      if (savedItineraryId) {
        initialItinerary = data.find(it => it._id === savedItineraryId);
      }

      if (!initialItinerary) {
        initialItinerary = data[0];
        localStorage.setItem('selectedItineraryId', initialItinerary._id);
      }

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

  const calculateTripStatus = useCallback(() => {
    if (!startDate || !endDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

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

  const handleItinerarySelect = useCallback((id) => {
    const selected = data?.find(it => it._id === id);
    if (selected) {
      setSelectedItinerary(selected);
      localStorage.setItem('selectedItineraryId', selected._id);
      setTempBudget(selected.budget);
      setExpenses(selected.expenses);
      setTotalSpent(selected.expenses.reduce((acc, curr) => acc + curr.amount, 0));

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

      setDestination({
        latitude: selected.destination?.coordinates?.latitude || 0,
        longitude: selected.destination?.coordinates?.longitude || 0
      });

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

      setExpenses(prevExpenses =>
        prevExpenses.map(expense =>
          expense._id === expenseId ? response.data : expense
        )
      );

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

      setExpenses(prevExpenses => prevExpenses.filter(e => e._id !== expense._id));

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

      setExpenses(prevExpenses => [...prevExpenses, response.data]);

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
  
  // Replace the empty state check with this clean implementation
  if (!data || data.length === 0) {
    return (
      <main className="p-8">
        <DashboardNavbar />
        <div className="p-4 mt-8 mx-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-8 md:grid-cols-2">
            {/* Welcome Card */}
            <div className="col-span-1 bg-gray-800 p-6 rounded-3xl shadow-sm text-white lg:col-span-8 overflow-hidden relative min-h-[300px] flex flex-col justify-center items-center">
              <img
                src="https://cdn.pixabay.com/photo/2019/08/12/17/11/asphalt-road-4401704_960_720.jpg"
                alt="Background"
                className="w-full h-full absolute blur-[5px] brightness-50 object-cover z-0"
              />
              <div className="relative z-10 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  {allData && allData.length > 0 
                    ? "No Active or Upcoming Trips" 
                    : "Welcome to Your Travel Dashboard"}
                </h1>
                <p className="text-xl mb-8">
                  {allData && allData.length > 0 
                    ? "All your trips are completed. Time to plan a new adventure!" 
                    : "Start planning your next adventure!"}
                </p>
                <Link 
                  to="/trips" 
                  className="bg-green-100 hover:bg-green-200 text-gray-800 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <i className="fa-solid fa-plus"></i>
                  {allData && allData.length > 0 ? "Plan New Trip" : "Create Your First Trip"}
                </Link>
              </div>
            </div>

            {/* Feature Preview Cards */}
            {[
              {
                icon: "fa-chart-pie",
                title: "Track Your Budget",
                description: "Plan and manage your trip expenses efficiently."
              },
              {
                icon: "fa-list-check",
                title: "Organize Activities",
                description: "Schedule your daily activities and keep track of your itinerary."
              },
              {
                icon: "fa-map-location-dot",
                title: "Map Your Destinations",
                description: "Visualize your travel route and explore locations."
              },
              {
                icon: "fa-suitcase",
                title: "Packing Checklist",
                description: "Never forget essential items with smart packing lists."
              }
            ].map((feature, index) => (
              <div key={index} className="col-span-1 lg:col-span-4 bg-gray-100 p-6 rounded-3xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  <i className={`fa-solid ${feature.icon} mr-2`}></i>
                  {feature.title}
                </h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-2 sm:p-4 md:p-8">
      <DashboardNavbar />
      {selectedItinerary && (
        <PDFErrorBoundary>
          <DownloadPDFButton 
            activities={activities}
            packingItems={packingItems}
            tripName={selectedItinerary.title}
            destination={selectedItinerary.destination?.name}
            dates={{ startDate: selectedItinerary.startDate, endDate: selectedItinerary.endDate }}
            budget={selectedItinerary.expenses}
          />
        </PDFErrorBoundary>
      )}
      <div className="sm:p-2 md:p-4 lg:p-8 mt-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
          {/* Welcome Card - Full width on mobile, 3 cols on large screens */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800 p-4 sm:p-6 rounded-3xl shadow-sm text-white overflow-hidden relative min-h-[250px] sm:min-h-[300px]">
            <img
              src="https://cdn.pixabay.com/photo/2019/08/12/17/11/asphalt-road-4401704_960_720.jpg"
              alt=""
              className="w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 absolute blur-[5px] brightness-50 left-1/2 top-1/2 z-0"
            />
            {/* Trip selection header - Stack on small screens */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 relative gap-2">
              <h2 className="text-lg sm:text-xl font-semibold"><i className="fa-paper-plane fa-solid mr-2"></i>YOUR TRIP</h2>
              <span className="relative w-full sm:w-auto">
                <span
                  className="bg-gray-700 rounded-full text-white cursor-pointer px-4 py-1 block text-center sm:inline-block"
                  onClick={toggleDropdown}
                >
                  {selectedItinerary?.title || 'Select Trip'} <i className="fa-angle-down fa-solid"></i>
                </span>
                {/* Dropdown positioning */}
                {showDropdown && (
                  <ul className="bg-white rounded-lg shadow-lg text-black absolute right-0 mt-2 w-full sm:w-48 z-20">
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
            {/* Welcome text - Responsive font sizes */}
            <div className="text-xl sm:text-2xl font-bold mb-2 relative z-10 line-clamp-2">
              Hey {selectedItinerary?.user?.name || 'there'} 👋
            </div>
            <div className="text-base sm:text-lg relative z-10 line-clamp-2">
              {selectedItinerary?.description}
            </div>
            <div className="text-sm relative z-10 mt-4">
              <span className="text-3xl sm:text-5xl font-bold line-clamp-1">{selectedItinerary?.title}</span>
            </div>
          </div>

          {/* Budget and Expenses Grid - Stack on mobile, 2 columns on tablet+ */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Budget Card */}
            <DashboardCard
              heading={"BUDGET"}
              icon={"fa-chart-pie fa-solid"}
              bg={"bg-[#f5f5f5]"}
              className="min-h-[200px] sm:min-h-[250px]"
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

            {/* Expenses Card */}
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
                            <div className="flex flex-1 gap-0.5 items-center">
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
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleUpdateExpense(ex._id);
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-1 gap-0.5 items-center">
                                <span>{ex.title}</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className="font-medium">
                                  ${ex.amount}
                                </span>
                                {isExpanded && (
                                  <div className="flex gap-2 ml-2">
                                    <i
                                      className="cursor-pointer fa-pen-to-square fa-solid hover:text-blue-600"
                                      onClick={() => handleExpenseEdit(ex)}
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

          {/* Calendar Card - Full width on mobile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <DashboardCard
              heading={"READINESS"}
              icon={"fa-hourglass-half fa-solid"}
              bg={"bg-blue-100"}
              className="min-h-[250px] sm:min-h-[300px]"
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

          {/* Map Component - Full width on mobile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#f5f5f5] p-4 sm:p-6 rounded-3xl shadow-sm relative min-h-[300px]">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              <i className="fa-location-crosshairs fa-solid mr-2"></i>
              DESTINATION
            </h2>
            <div className="h-fit">
              <GMap destinations={destination} />
            </div>
          </div>

          {/* Activities Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <DashboardCard
              heading={"ACTIVITY"}
              icon={"fa-person-walking fa-solid"}
              bg={"bg-amber-100"}
              className="min-h-[400px]"
            >
              {(isExpanded) => (
                <div>
                  <Activities 
                    activities={activities}
                    startDate={startDate}
                    isExpanded={isExpanded}
                    getDayNumber={getDayNumber}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                    isAddingTask={isAddingTask}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    setIsAddingTask={setIsAddingTask}
                    handleAddTask={handleAddTask}
                  />
                  <button
                    className="flex text-gray-800 text-xl absolute bottom-4 cursor-pointer items-center mt-4 py-2"
                    onClick={() => setIsAddingTask(true)}
                  >
                    <div className='flex bg-gray-800 h-6 justify-center rounded-full text-base text-yellow-100 w-6 items-center mr-2'>
                      <i className="fa-plus fa-solid"></i>
                    </div>
                    Add Activity
                  </button>
                </div>
              )}
            </DashboardCard>
          </div>

          {/* Packing List - Full width on mobile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 text-white">
            <DashboardCard
              heading={"PACKING LIST"}
              icon={"fa-list fa-solid"}
              bg={"bg-gray-800"}
              className="min-h-[400px]"
            >
              {(isExpanded) => (
                <div className="flex flex-col h-full justify-between">
                  <ul className="max-h-[360px] mb-16 overflow-auto space-y-2">
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
                    className="flex text-white text-xl absolute bottom-4 cursor-pointer items-center mt-4 py-2"
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
export default React.memo(Dashboard);