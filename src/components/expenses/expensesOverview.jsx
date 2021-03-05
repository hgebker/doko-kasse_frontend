import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import Icon from '@salesforce/design-system-react/components/icon';

import useExpenses from './useExpenses';
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

export default function ExpensesOverview() {
  const [expenses, spinner] = useExpenses();

  return (
    <>
      {spinner}

      <PageHeader
        icon={<Icon category="standard" name="expense" />}
        label="Ausgaben"
        title="Gesamt"
        truncate
        variant="object-home"
        info={`${expenses.length} Ergebnisse`}
        className="slds-var-m-bottom_small"
      />

      <div className="slds-box slds-p-around_none slds-theme_default">
        <DataTable items={expenses} stackedHorizontal style={{ border: 'none' }}>
          <DataTableColumn key="art" label="Beschreibung" property="art" />
          <DataTableColumn key="semester" label="Semester" property="semester">
            <SemesterTableCell />
          </DataTableColumn>
          <DataTableColumn key="wert" label="Preis" property="wert">
            <CustomTableCell />
          </DataTableColumn>
        </DataTable>
      </div>
    </>
  );
}
