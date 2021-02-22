import { useEffect, useState } from 'react';
import { eveningsAPI } from 'api';
import { useSpinner } from 'components/HOC/withSpinner';

const useEvenings = selectedSemester => {
  const [evenings, setEvenings] = useState([]);
  const [spinner, setLoading] = useSpinner();

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        setEvenings(await eveningsAPI.listEvenings(selectedSemester.id));
      } catch (error) {
        setEvenings([]);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [selectedSemester, setLoading]);

  return [evenings, spinner];
};

export default useEvenings;
