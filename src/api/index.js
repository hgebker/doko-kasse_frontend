import axios from 'axios';

const baseUri = ' https://7tkxbt9xwj.execute-api.eu-central-1.amazonaws.com';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = `${baseUri}/dev`;
} else {
  axios.defaults.baseURL = `${baseUri}/prod`;
}

export * as eveningsAPI from './eveningsApi';
export * as reportsAPI from './reportsAPI';
export * as expensesAPI from './expensesApi';
export * as earningsAPI from './earningsApi';
