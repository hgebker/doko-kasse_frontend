import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;

export * as eveningsAPI from './eveningsApi';
export * as reportsAPI from './reportsApi';
export * as expensesAPI from './expensesApi';
export * as earningsAPI from './earningsApi';
