import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

import { SEMESTER_LABEL } from 'constants/semester.js';
import FormattedNumberField from 'components/base/formattedNumberField';

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

export default function ExpensesTable({ expenses }) {
  return (
    <DataTable items={expenses} stackedHorizontal style={{ border: 'none' }}>
      <DataTableColumn key="art" label="Beschreibung" property="art" />
      <DataTableColumn key="wert" label="Preis" property="wert">
        <CustomTableCell />
      </DataTableColumn>
      <DataTableColumn key="semester" label="Semester" property="semester">
        <SemesterTableCell />
      </DataTableColumn>
    </DataTable>
  );
}
