import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import DataTableRowActions from '@salesforce/design-system-react/components/data-table/row-actions';

import { SEMESTER_LABEL } from 'constants/semester.js';
import FormattedNumberField from 'components/base/formattedNumberField';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CustomTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    <FormattedNumberField value={children} />
  </DataTableCell>
);
CustomTableCell.displayName = DataTableCell.displayName;

const SemesterTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>{SEMESTER_LABEL[children]}</DataTableCell>
);
SemesterTableCell.displayName = DataTableCell.displayName;

const ROW_ACTIONS = [
  {
    id: 'edit',
    label: 'Bearbeiten',
    value: 'edit'
  },
  {
    id: 'delete',
    label: 'Löschen',
    value: 'delete'
  }
];

const useStyles = makeStyles({
  datatable: {
    '& td': {
      overflow: 'visible',
      width: 'unset !important'
    }
  }
});

export default function EarningsTable({ earnings, onUpdate, onDelete }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRowAction = (item, action) => {
    switch (action.value) {
      case 'edit':
        onUpdate(item);
        break;
      case 'delete':
        onDelete(item.art);
        break;
      default:
        console.error('Not defined');
        break;
    }
  };

  return (
    <DataTable
      items={earnings}
      stackedHorizontal
      style={{ border: 'none' }}
      striped={isMobile}
      className={classes.datatable}>
      <DataTableColumn key="art" label="Beschreibung" property="art" />
      <DataTableColumn key="betrag" label="Betrag" property="betrag">
        <CustomTableCell />
      </DataTableColumn>
      <DataTableColumn key="semester" label="Semester" property="semester">
        <SemesterTableCell />
      </DataTableColumn>

      <DataTableRowActions options={ROW_ACTIONS} onAction={handleRowAction} />
    </DataTable>
  );
}
