import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://ohrdm8vwf2.execute-api.eu-central-1.amazonaws.com/dev';
} else {
  axios.defaults.baseURL = 'https://ohrdm8vwf2.execute-api.eu-central-1.amazonaws.com/prod';
}

export * as eveningsAPI from './eveningsApi';
export * as reportsAPI from './reportsAPI';
