import { useEffect, useState } from 'react';
import { eveningsAPI } from 'api';
import { SpinnerNode, useSpinner } from 'components/HOC/withSpinner';

const useEvenings = (selectedSemester: { id: string }): [Evening[], (evenings: Evening[]) => void, SpinnerNode] => {
  const [evenings, setEvenings] = useState<Evening[]>([]);
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

  return [evenings, setEvenings, spinner];
};

export default useEvenings;
