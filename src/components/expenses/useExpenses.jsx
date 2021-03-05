import { useEffect, useState } from 'react';
import { expensesAPI } from 'api';
import { useSpinner } from 'components/HOC/withSpinner';

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [spinner, setLoading] = useSpinner();

  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      try {
        setExpenses(await expensesAPI.getAllExpenses());
      } catch (error) {
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, [setLoading]);

  return [expenses, setExpenses, spinner];
}
