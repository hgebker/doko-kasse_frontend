import axios from 'axios';

axios.defaults.baseURL = 'https://ohrdm8vwf2.execute-api.eu-central-1.amazonaws.com/prod';

export * as eveningsAPI from './eveningsApi';
export * as reportsAPI from './reportsAPI';
