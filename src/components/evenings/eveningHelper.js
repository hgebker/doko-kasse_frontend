import { flow } from 'lodash';
import { PLAYERS } from '../../constants/player';

const formatNumber = number => `${number.toFixed(2)} €`.replace('.', ',');

const calculateSum = values => values.reduce((sum, el) => sum + el, 0);

const calculateAverage = (value, count) => value / count;

const filterPlayerValues = evening => {
  const entries = Object.entries(evening);
  return entries.filter(([key]) => PLAYERS.includes(key));
};

const filterPlayerValuesPresentNotDefault = values =>
  values.filter(([key, value]) => key !== 'sonstige' && value).map(([_, value]) => value);

const parseEvening = item => {
  const playerValues = filterPlayerValues(item);
  const realValues = filterPlayerValuesPresentNotDefault(playerValues);

  const sum = calculateSum(realValues);
  const avg = calculateAverage(sum, realValues.length);

  const max = Math.max(...realValues);
  const maxPlayer = PLAYERS.filter(key => item[key] === max).join(', ');

  const min = Math.min(...realValues);
  const minPlayer = PLAYERS.filter(key => item[key] === min).join(', ');

  return {
    Datum: item.Datum,
    semester: item.semester,
    ...Object.fromEntries(playerValues.map(([key, value]) => [key, formatNumber(value)])),
    sum: formatNumber(sum),
    avg: formatNumber(avg),
    max: `${maxPlayer} - ${formatNumber(max)}`,
    min: `${minPlayer} - ${formatNumber(min)}`
  };
};

const parseSum = evening =>
  flow(filterPlayerValues, filterPlayerValuesPresentNotDefault, calculateSum, formatNumber)(evening);

export { formatNumber, parseEvening, parseSum };
