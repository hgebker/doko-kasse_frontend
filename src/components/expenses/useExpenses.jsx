import { useEffect, useState } from 'react';
import { expensesAPI } from 'api';

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      setExpenses(await expensesAPI.getAllExpenses());
    } catch (error) {
      setExpenses([]);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return [expenses, loadExpenses];
}
