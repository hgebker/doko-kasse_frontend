import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';
import { MobileContext } from 'app';

const useStyles = makeStyles({
  checkbox: ({ isMobile }) => ({
    display: 'flex',
    justifyContent: isMobile ? 'right' : 'center',
    '& label span': {
      marginRight: '0 !important'
    }
  })
});

export default function BaseTableCheckboxCell({ children, ...props }) {
  const isMobile = useContext(MobileContext);
  const classes = useStyles({ isMobile });

  return (
    <DataTableCell {...props}>
      <Checkbox checked={children} className={classes.checkbox} />
    </DataTableCell>
  );
}
BaseTableCheckboxCell.displayName = DataTableCell.displayName;
