import axios, { AxiosResponse } from 'axios';
import { apiUtils } from 'services/utils';

const listEvenings = async (semester: string): Promise<Evening[]> => {
  const endpoint = semester !== 'gesamt' ? `/evenings?semester=${semester}` : '/evenings';
  const requestConfig = {
    headers: {
      Accept: 'application/json'
    }
  };

  try {
    const response: AxiosResponse<Evening[]> = await axios.get(endpoint, requestConfig);

    return response.data;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const getEvening = async (date: string): Promise<Evening> => {
  const endpoint = `/evenings/${date}`;
  const requestConfig = {
    headers: {
      Accept: 'application/json'
    }
  };

  try {
    const response: AxiosResponse<Evening> = await axios.get(endpoint, requestConfig);

    return response.data;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const createEvening = async (newEvening: Evening): Promise<Evening> => {
  const endpoint = `/evenings`;
  const requestConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.post(endpoint, newEvening, requestConfig);
    return newEvening;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const updateEvening = async (eveningToUpdate: Evening): Promise<Evening> => {
  const endpoint = `/evenings/${eveningToUpdate.Datum}`;
  const requestConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.put(endpoint, eveningToUpdate, requestConfig);
    return eveningToUpdate;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const deleteEvening = async (date: string): Promise<void> => {
  const endpoint = `/evenings/${date}`;

  try {
    await axios.delete(endpoint);
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

export { listEvenings, getEvening, createEvening, updateEvening, deleteEvening };
