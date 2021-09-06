import { useEffect, useState } from 'react';
import { earningsAPI } from 'api';

export default function useEarnings() {
  const [earnings, setEarnings] = useState([]);

  const loadEarnings = async () => {
    try {
      setEarnings(await earningsAPI.getAllEarnings());
    } catch (error) {
      setEarnings([]);
    }
  };

  useEffect(() => {
    loadEarnings();
  }, []);

  return [earnings, loadEarnings];
}
