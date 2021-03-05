import { makeStyles } from '@material-ui/core/styles';
import EveningOverview from '../evenings/eveningOverview';
import ReportView from '../reports/reportView';
import CashOverview from '../overview/cashOverview';
import classNames from 'classnames';

const useStyles = makeStyles({
  '@media screen and (min-width: 500px)': {
    container: {
      maxHeight: '90vh'
    }
  }
});

const NavigationContent = ({ activeContent }) => {
  const classes = useStyles();
  let node;

  switch (activeContent) {
    case 'overview':
      node = <CashOverview />;
      break;

    case 'evenings':
      node = <EveningOverview />;
      break;

    case 'reports':
      node = <ReportView />;
      break;

    default:
      node = <h1 className="slds-text-color_error">Error</h1>;
      break;
  }

  return <div className={classNames('slds-var-p-around_small', classes.container)}>{node}</div>;
};

export default NavigationContent;
