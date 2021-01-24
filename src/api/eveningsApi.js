import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import { apiUtils } from '../services';

const listEvenings = async () => {
  try {
    const response = await API.graphql({ query: queries.listEvenings, variables: { limit: 100 } });

    return response.data.listEvenings.items;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

const createEvening = async item => {
  try {
    await API.graphql({ query: mutations.createEvening, variables: { input: item } });
    return item;
  } catch (error) {
    apiUtils.logError(error);
    throw error;
  }
};

export { listEvenings, createEvening };
