import { formatNumber } from 'services/utils/baseUtils';

const FormattedNumberField = ({ value }) => {
  return formatNumber(value);
};

export default FormattedNumberField;
