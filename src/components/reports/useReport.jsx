import { useEffect, useState } from 'react';
import { reportsAPI } from 'api';

const useReport = selectedSemester => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        setReport(await reportsAPI.getReportForSemester(selectedSemester.id));
      } catch (error) {
        setReport(null);
      } finally {
      }
    };

    loadReport();
  }, [selectedSemester]);

  return report;
};

export default useReport;
