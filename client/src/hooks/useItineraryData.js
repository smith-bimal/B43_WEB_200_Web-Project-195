import { useState, useEffect, useCallback } from 'react';
import instance from '../config/axios';

export const useItineraryData = (itineraryId) => {
  const [data, setData] = useState({
    itinerary: null,
    activities: [],
    expenses: [],
    packingItems: [],
    destinations: [],
    totalBudget: 0,
    amountSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!itineraryId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await instance.get(`/itineraries/${itineraryId}/full`);

      const { budget, amount_spent, ...rest } = response.data;
      setData({
        ...rest,
        totalBudget: budget || 0,
        amountSpent: amount_spent || 0
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load itinerary data');
    } finally {
      setLoading(false);
    }
  }, [itineraryId]);

  // Expenses CRUD
  const updateExpense = async (expenseId, updateData) => {
    try {
      const response = await instance.put(`/expenses/${expenseId}`, updateData);
      setData(prev => ({
        ...prev,
        expenses: prev.expenses.map(exp =>
          exp._id === expenseId ? response.data : exp
        ),
        amountSpent: prev.expenses.reduce((sum, exp) =>
          sum + (exp._id === expenseId ? response.data.amount : exp.amount), 0
        )
      }));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update expense');
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await instance.post('/expenses', {
        ...newExpense,
        itinerary: itineraryId
      });
      setData(prev => ({
        ...prev,
        expenses: [response.data, ...prev.expenses],
        amountSpent: prev.amountSpent + response.data.amount
      }));
    } catch (err) {
      console.log(err);
      throw new Error(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await instance.delete(`/expenses/${expenseId}`);
      setData(prev => {
        const expense = prev.expenses.find(e => e._id === expenseId);
        return {
          ...prev,
          expenses: prev.expenses.filter(e => e._id !== expenseId),
          amountSpent: prev.amountSpent - (expense?.amount || 0)
        };
      });
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete expense');
    }
  };

  // Packing Items CRUD
  const updatePackingItem = async (itemId, updateData) => {
    try {
      const response = await instance.put(`/packing/${itemId}`, updateData);
      setData(prev => ({
        ...prev,
        packingItems: prev.packingItems.map(item =>
          item._id === itemId ? response.data : item
        )
      }));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update packing item');
    }
  };

  const addPackingItem = async (newItem) => {
    try {
      const response = await instance.post('/packing', {
        ...newItem,
        itinerary: itineraryId
      });
      setData(prev => ({
        ...prev,
        packingItems: [response.data, ...prev.packingItems]
      }));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add packing item');
    }
  };

  const deletePackingItem = async (itemId) => {
    try {
      await instance.delete(`/packing/${itemId}`);
      setData(prev => ({
        ...prev,
        packingItems: prev.packingItems.filter(item => item._id !== itemId)
      }));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete packing item');
    }
  };

  // Budget update
  const updateBudget = async (newBudget) => {
    try {
      const response = await instance.put(`/itineraries/${itineraryId}`, {
        budget: newBudget
      });
      setData(prev => ({
        ...prev,
        totalBudget: response.data.budget
      }));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update budget');
    }
  };

  // Activities
  const refetchActivities = useCallback(async () => {
    try {
      const response = await instance.get(`/activities?itinerary=${itineraryId}`);
      setData(prev => ({
        ...prev,
        activities: response.data
      }));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to fetch activities');
    }
  }, [itineraryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    loading,
    error,
    updateExpense,
    addExpense,
    deleteExpense,
    updatePackingItem,
    addPackingItem,
    deletePackingItem,
    updateBudget,
    refetchActivities,
    refreshData: fetchData
  };
};
