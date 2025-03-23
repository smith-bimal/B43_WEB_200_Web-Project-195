/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import BudgetChart from "../components/BudgetChart";
import Spinner from "../components/Spinner";
import GMap from "../components/GMap";
import DashboardCard from "../components/DashboardCard";
import Calendar from '../components/Calendar';
import 'react-day-picker/dist/style.css';
import ActivityTask from "../components/ActivityTask";
import { useItineraryData } from "../hooks/useItineraryData";


const Test = () => {
    const taskList = [];
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const { data } = useItineraryData();

    const itineraries = ["Kathmandu", "Pokhara", "Chitwan", "Everest"];
    const [expenses, setExpenses] = useState([
        { name: "Air ticket", amount: 230 },
        { name: "Taxi rent", amount: 10 },
        { name: "King burger", amount: 12 },
        { name: "Trekking gear", amount: 95 },
    ]);
    const [packingItems, setPackingItems] = useState([
        { id: 1, name: "Backpack", checked: false },
        { id: 2, name: "Camera & GoPro", checked: false },
        { id: 3, name: "Laptop & Charger", checked: false },
        { id: 4, name: "Hot water button", checked: false },
        { id: 5, name: "Medical Aid", checked: false },
        { id: 6, name: "Winter Jacket", checked: false },
    ]);
    const [checkedItems, setCheckedItems] = useState({});

    const [editingExpense, setEditingExpense] = useState(null);
    const [editingPackingItem, setEditingPackingItem] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const [isAddingPackingItem, setIsAddingPackingItem] = useState(false);
    const [newExpense, setNewExpense] = useState({ name: '', amount: '' });
    const [newPackingItem, setNewPackingItem] = useState('');

    const [startDate, setStartDate] = useState("2025-03-18");
    const [endDate, setEndDate] = useState(null);
    const [tripStatus, setTripStatus] = useState({ text: '', days: 0 });
    const [range, setRange] = useState({ from: undefined, to: undefined });

    const [totalBudget, setTotalBudget] = useState(1800);
    const [editingBudget, setEditingBudget] = useState(false);

    const [tasks, setTasks] = useState(taskList);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        date: '',
        descriptions: ['']
    });

    const calculateTripStatus = () => {
        if (!startDate || !endDate) return;

        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        const daysTillStart = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
        const daysTillEnd = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

        if (daysTillStart > 0) {
            setTripStatus({
                text: 'Days left',
                days: daysTillStart
            });
        } else if (daysTillEnd >= 0) {
            setTripStatus({
                text: 'Trip ongoing',
                days: daysTillEnd + 1
            });
        } else {
            setTripStatus({
                text: 'Trip completed',
                days: 0
            });
        }
    };

    const calculateTotalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    const handleBudgetSave = () => {
        console.log("Saving budget:", totalBudget);
        setEditingBudget(false);
    };

    useEffect(() => {
        calculateTripStatus();
    }, [startDate, endDate]);

    useEffect(() => {
        if (range.from && range.to) {
            setStartDate(range.from);
            setEndDate(range.to);
        }
    }, [range]);

    const handleExpenseEdit = (expense, index) => {
        setEditingExpense(index);
    };

    const handlePackingEdit = (itemId) => {
        setEditingPackingItem(itemId);
    };

    const updateExpense = (index, field, value) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[index] = {
            ...updatedExpenses[index],
            [field]: field === "amount" ? parseFloat(value) || 0 : value,
        };
        setExpenses(updatedExpenses);
    };

    const updatePackingItem = (itemId, newName) => {
        setPackingItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, name: newName } : item
        ));
    };

    const handleAddExpense = () => {
        if (newExpense.name && newExpense.amount) {
            setExpenses([
                { name: newExpense.name, amount: parseFloat(newExpense.amount) },
                ...expenses
            ]);
            setNewExpense({ name: '', amount: '' });
            setIsAddingExpense(false);
        }
    };

    const handleAddPackingItem = () => {
        if (newPackingItem.trim()) {
            const newItem = {
                id: Date.now(),
                name: newPackingItem.trim(),
                checked: false
            };
            setPackingItems(prev => [newItem, ...prev]);
            setNewPackingItem('');
            setIsAddingPackingItem(false);
        }
    };

    const handleExpenseBlur = (e) => {
        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setEditingExpense(null);
                if (isAddingExpense) {
                    handleAddExpense();
                }
            }
        });
    };

    const handleCheckboxChange = (itemId) => {
        setPackingItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleEditTask = (updatedTask) => {
        setTasks(prev => prev.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        ));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleDeletePackingItem = (itemId) => {
        setPackingItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleAddTask = () => {
        if (newTask.title && newTask.date) {
            const task = {
                id: Date.now(),
                ...newTask
            };
            setTasks(prev => [task, ...prev]);
            setNewTask({ title: '', date: '', descriptions: [''] });
            setIsAddingTask(false);
        }
    };

    const getDayNumber = (date) => {
        if (!startDate || !date) return null;
        const start = new Date(startDate);
        const current = new Date(date);
        const diffTime = current - start;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

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
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <h2 className="text-xl font-semibold"><i className="fa-paper-plane fa-solid mr-2"></i>YOUR TRIP</h2>
                            <span className="relative">
                                <span
                                    className="bg-gray-700 rounded-full text-white cursor-pointer px-4 py-1"
                                    onClick={toggleDropdown}
                                >
                                    Nepal <i className="fa-angle-down fa-solid"></i>
                                </span>
                                {showDropdown && (
                                    <ul className="bg-white rounded-lg shadow-lg text-black absolute mt-2 overflow-hidden">
                                        {itineraries.map((destination, index) => (
                                            <li
                                                key={index}
                                                className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                                            >
                                                {destination}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </span>
                        </div>
                        <div className="text-2xl font-bold mb-2 relative z-10">
                            Hey Ashik! 👋
                        </div>
                        <div className="text-lg relative z-10">
                            Welcome To Your <span className="text-5xl font-bold">Nepal</span> Adventure!
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
                                                    value={totalBudget}
                                                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                                                    onBlur={handleBudgetSave}
                                                    className="bg-transparent border-none w-24 font-bold outline-none"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span
                                                    className="cursor-pointer font-bold"
                                                    onClick={() => isExpanded && setEditingBudget(true)}
                                                >
                                                    ${totalBudget}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <BudgetChart
                                        totalBudget={totalBudget}
                                        totalSpent={calculateTotalExpenses()}
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
                                                        value={newExpense.name}
                                                        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                                                        className="flex-1 bg-transparent border-none outline-none"
                                                        onBlur={handleAddExpense}
                                                        autoFocus
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Amount"
                                                        value={newExpense.amount}
                                                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                                        className="bg-transparent border-none text-right w-20 font-medium outline-none"
                                                        onBlur={handleAddExpense}
                                                    />
                                                </div>
                                            </li>
                                        )}
                                        {expenses.length === 0 && !isAddingExpense ? (
                                            <div className="text-center text-gray-500 py-4">No expenses recorded yet</div>
                                        ) : (
                                            expenses.map((expense, index) => (
                                                <li
                                                    key={index}
                                                    className="flex border-b border-b-[#0001] justify-between group items-center py-2"
                                                >
                                                    {editingExpense === index ? (
                                                        <div className="flex flex-1 gap-0.5 items-center" onBlur={(e) => handleExpenseBlur(e, index)}>
                                                            <input
                                                                type="text"
                                                                value={expense.name}
                                                                onChange={(e) =>
                                                                    updateExpense(index, "name", e.target.value)
                                                                }
                                                                className="bg-transparent border-none w-2/3 min-w-0 outline-none truncate"
                                                                autoFocus
                                                            />
                                                            <input
                                                                type="number"
                                                                value={expense.amount}
                                                                onChange={(e) =>
                                                                    updateExpense(index, "amount", e.target.value)
                                                                }
                                                                className="bg-transparent border-none text-right w-20 font-medium outline-none"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span>{expense.name}</span>
                                                            <div className="flex gap-2 items-center">
                                                                <span className="font-medium">
                                                                    ${expense.amount}
                                                                </span>
                                                                {isExpanded && (
                                                                    <div className="flex gap-2 ml-2">
                                                                        <i
                                                                            className="cursor-pointer fa-pen-to-square fa-solid hover:text-blue-600"
                                                                            onClick={() =>
                                                                                handleExpenseEdit(expense, index)
                                                                            }
                                                                        ></i>
                                                                        <i
                                                                            className="cursor-pointer fa-solid fa-trash hover:text-red-600"
                                                                            onClick={() =>
                                                                                setExpenses(
                                                                                    expenses.filter((_, i) => i !== index)
                                                                                )
                                                                            }
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
                                                onSelect={setRange}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {(range.from && range.to) ? (
                                                <div className="relative">
                                                    <Spinner />
                                                    <div className="text-center -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2">
                                                        <span className="text-8xl font-bold">{tripStatus.days || '--'}</span>
                                                        <p className="text-center">{tripStatus.text || 'Select dates'}</p>
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
                            DESTINATIONS
                        </h2>
                        <GMap />
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
                                                    value={newTask.title}
                                                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                                    className="border p-2 rounded w-full mb-2"
                                                />
                                                {newTask.descriptions.map((desc, idx) => (
                                                    <div key={idx} className="flex gap-2 mb-2">
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
                                            Array.from(new Set(tasks.map(task => task.date)))
                                                .sort()
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
                                                            {tasks
                                                                .filter(task => task.date === date)
                                                                .map(task => (
                                                                    <ActivityTask
                                                                        key={task.id}
                                                                        task={task}
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
                                        New Task
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
                                <div className="flex flex-col h-full justify-between relative">
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
                                                        value={newPackingItem}
                                                        onChange={(e) => setNewPackingItem(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddPackingItem()}
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
                                                    key={item.id}
                                                    className="flex border-b border-b-[#fff2] justify-between group hover:bg-white/5 items-center py-2"
                                                >
                                                    <div className="flex flex-1 gap-4 items-center">
                                                        <input
                                                            id={`checkbox-${item.id}`}
                                                            type="checkbox"
                                                            checked={item.checked}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                            className="border-2 border-gray-300 h-6 rounded-full w-6 appearance-none checked:bg-[#f5f5f5] checked:border-gray-500 cursor-pointer"
                                                        />
                                                        {editingPackingItem === item.id ? (
                                                            <input
                                                                type="text"
                                                                value={item.name}
                                                                onChange={(e) => updatePackingItem(item.id, e.target.value)}
                                                                onBlur={() => setEditingPackingItem(null)}
                                                                onKeyDown={(e) => e.key === 'Enter' && setEditingPackingItem(null)}
                                                                className="flex-1 bg-transparent border-none text-white outline-none"
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <label
                                                                htmlFor={`checkbox-${item.id}`}
                                                                className={`${item.checked ? 'line-through text-gray-500' : 'text-gray-200'} transition-colors duration-200 flex-1 cursor-pointer`}
                                                            >
                                                                {item.name}
                                                            </label>
                                                        )}
                                                    </div>
                                                    {isExpanded && !editingPackingItem && (
                                                        <div className="flex duration-200 gap-2 group-hover:opacity-100 opacity-0 transition-all">
                                                            <i
                                                                className="cursor-pointer fa-pen-to-square fa-solid hover:text-blue-400"
                                                                onClick={() => handlePackingEdit(item.id)}
                                                            ></i>
                                                            <i
                                                                className="cursor-pointer fa-solid fa-trash hover:text-red-400"
                                                                onClick={() => handleDeletePackingItem(item.id)}
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

export default Test;