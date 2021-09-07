import { useCallback, useEffect, useState } from 'react';
import { expensesAPI } from 'api';
import { useSpinner } from 'components/HOC/withSpinner';

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [spinner, setLoading] = useSpinner();

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    try {
      setExpenses(await expensesAPI.getAllExpenses());
    } catch (error) {
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return [expenses, loadExpenses, spinner, setLoading];
}
