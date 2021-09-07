import { useCallback, useEffect, useState } from 'react';
import { eveningsAPI } from 'api';
import { useSpinner } from 'components/HOC/withSpinner';

const useEvenings = selectedSemester => {
  const [evenings, setEvenings] = useState([]);
  const [spinner, setLoading] = useSpinner();

  const loadEvenings = useCallback(async () => {
    setLoading(true);
    try {
      setEvenings(await eveningsAPI.listEvenings(selectedSemester.id));
    } catch (error) {
      setEvenings([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSemester, setLoading]);

  useEffect(() => {
    loadEvenings();
  }, [selectedSemester, loadEvenings]);

  return [evenings, loadEvenings, spinner, setLoading];
};

export default useEvenings;
