import { FC } from 'react';

interface Props {
  value: string;
}

const FormattedTextField: FC<Props> = ({ value }) => {
  return <p style={{ display: 'inline', textTransform: 'capitalize' }}>{value}</p>;
};

export default FormattedTextField;
