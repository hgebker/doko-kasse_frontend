import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import DataTableRowActions from '@salesforce/design-system-react/components/data-table/row-actions';

import { SEMESTER_LABEL } from 'constants/semester.js';
import FormattedNumberField from 'components/base/formattedNumberField';

import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { MobileContext } from 'app';

const useStyles = makeStyles({
  datatable: {
    '& td': {
      overflow: 'visible',
      width: 'unset !important'
    }
  }
});

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

export default function ExpensesTable({ expenses, onUpdate, onDelete }) {
  const classes = useStyles();
  const isMobile = useContext(MobileContext);

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
      items={expenses}
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

      <DataTableRowActions options={ROW_ACTIONS} onAction={handleRowAction} menuPosition="overflowBoundaryElement" />
    </DataTable>
  );
}
