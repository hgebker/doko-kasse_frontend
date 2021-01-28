import { API } from 'aws-amplify';
import * as queries from 'graphql/queries';
import * as mutations from 'graphql/mutations';
import { apiUtils } from 'services/utils';

const listEvenings = async filter => {
  try {
    const response = await API.graphql({
      query: queries.listEvenings,
      variables: { limit: 100, filter },
      authMode: 'API_KEY'
    });

    return response.data.listEvenings.items;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const getEvening = async date => {
  try {
    const response = await API.graphql({
      query: queries.getEvening,
      variables: { Datum: date },
      authMode: 'API_KEY'
    });

    return response.data.listEvenings.items;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const createEvening = async newEvening => {
  try {
    await API.graphql({
      query: mutations.createEvening,
      variables: { input: newEvening },
      authMode: 'API_KEY'
    });
    return newEvening;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const updateEvening = async eveningToUpdate => {
  try {
    await API.graphql({
      query: mutations.updateEvening,
      variables: { input: eveningToUpdate },
      authMode: 'API_KEY'
    });
    return eveningToUpdate;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const deleteEvening = async date => {
  try {
    await API.graphql({
      query: mutations.deleteEvening,
      variables: { input: { Datum: date } },
      authMode: 'API_KEY'
    });
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

export { listEvenings, getEvening, createEvening, updateEvening, deleteEvening };
