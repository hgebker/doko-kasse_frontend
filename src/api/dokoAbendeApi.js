import axios from 'axios';
import { SEMESTER_LABEL } from '../constants/semester';
import { apiUtils } from '../services';

const ENDPOINT_URL = 'https://ohrdm8vwf2.execute-api.eu-central-1.amazonaws.com/default/doko-abende';

const REQUEST_CONFIG = {
  baseURL: ENDPOINT_URL,
  transformResponse: [
    response =>
      JSON.parse(response).map(evening => ({
        id: evening.Datum,
        label: evening.Datum,
        bottomLeftText: SEMESTER_LABEL[evening.semester],
        topRightText: 'Gesamt:',
        bottomRightText: evening.sum,
        data: evening
      }))
  ]
};

const getEntries = async () => {
  try {
    const response = await axios.get(ENDPOINT_URL, REQUEST_CONFIG);
    apiUtils.checkResponse(response);

    return response.data;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const createEntry = async item => {
  try {
    const response = await axios.post(ENDPOINT_URL, item);

    apiUtils.checkResponse(response);
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

export { getEntries, createEntry };
