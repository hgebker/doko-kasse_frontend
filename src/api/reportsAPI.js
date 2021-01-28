import { eveningsAPI } from '.';
import { apiUtils, reportUtils } from 'services/utils';

const getReportForSemester = async ({ id }) => {
  try {
    const evenings = await eveningsAPI.listEvenings(id !== 'gesamt' ? { semester: { eq: id } } : null);

    return reportUtils.calculateReport(evenings);
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

export { getReportForSemester };
