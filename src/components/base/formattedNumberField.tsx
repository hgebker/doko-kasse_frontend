import { FC } from 'react';
import { formatNumber } from 'services/utils/baseUtils';

interface Props {
  value: number;
  className: string;
}

const FormattedNumberField: FC<Props> = ({ value, className }) => {
  return (
    <p className={className} style={{ display: 'inline' }}>
      {formatNumber(value)}
    </p>
  );
};

export default FormattedNumberField;
