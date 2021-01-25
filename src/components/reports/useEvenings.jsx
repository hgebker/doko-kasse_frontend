import { useEffect, useState } from 'react';
import { eveningsAPI } from '../../api';

const useEvenings = selectedSemester => {
  const [evenings, setEvenings] = useState([]);

  useEffect(() => {
    const loadEvenings = async () => {
      try {
        setEvenings(await eveningsAPI.listEvenings({ semester: { eq: selectedSemester.id } }));
      } catch (error) {
        setEvenings([]);
      }
    };

    loadEvenings();
  }, [selectedSemester]);

  return evenings;
};

export default useEvenings;
