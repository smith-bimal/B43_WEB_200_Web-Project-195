import instance from '../config/axios';

export const updateBudget = (id, budget) => {
    return instance.put(`/itineraries/${id}`, { budget });
}

export const addExpense = ({ title, amount = 0, itinerary }) => {
    return instance.post('/expenses', { title, amount, itinerary });
}

export const updateExpense = (id, data) => {
    const { title, amount } = data;
    return instance.put(`/expenses/${id}`, {
        title,
        amount: parseFloat(amount) || 0
    });
}

export const deleteExpense = (id) => {
    return instance.delete(`/expenses/${id}`);
}

export const refetchTasks = (itinerary) => {
    return instance.get(`/activities?itinerary=${itinerary}`);
}

export const addTasks = (task) => {
    return instance.post('/activities', task);
}

export const updateTask = (id, task) => {
    return instance.put(`/activities/${id}`, task);
}

export const addPackings = ({ item, itinerary }) => {
    return instance.post('/packing', { item, itinerary });
}

export const updatePacking = (id, data) => {
    return instance.put(`/packing/${id}`, data);
}

export const deletePacking = (id) => {
    return instance.delete(`/packing/${id}`);
}