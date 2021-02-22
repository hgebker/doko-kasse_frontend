import axios from 'axios';
import { apiUtils } from 'services/utils';

const getReportForSemester = async semester => {
  const endpoint = semester !== 'gesamt' ? `/reports?semester=${semester}` : '/reports';
  const requestConfig = {
    headers: {
      Accept: 'application/json'
    }
  };

  try {
    const report = await axios.get(endpoint, requestConfig);

    return report.data;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

export { getReportForSemester };
