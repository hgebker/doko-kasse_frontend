import { useEffect, useState } from 'react';
import { reportsAPI } from 'api';
import { useSpinner } from 'components/HOC/withSpinner';

const useReport = selectedSemester => {
  const [report, setReport] = useState(null);
  const [spinner, setLoading] = useSpinner();

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        setReport(await reportsAPI.getReportForSemester(selectedSemester.id));
      } catch (error) {
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [selectedSemester, setLoading]);

  return [report, spinner];
};

export default useReport;
