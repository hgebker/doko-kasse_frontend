import FormattedNumberField from 'components/base/formattedNumberField';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

const CustomTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    <FormattedNumberField value={children} />
  </DataTableCell>
);
CustomTableCell.displayName = DataTableCell.displayName;

const SemesterTable = ({ evenings }) => {
  return (
    <div style={{ maxHeight: '35vh', overflowY: 'auto' }}>
      <DataTable items={evenings} className="slds-var-p-around_small">
        <DataTableColumn key="datum" label="Datum" property="Datum" />
        <DataTableColumn key="tim" label="Tim" property="tim">
          <CustomTableCell />
        </DataTableColumn>
        <DataTableColumn key="jan" label="Jan" property="jan">
          <CustomTableCell />
        </DataTableColumn>
        <DataTableColumn key="ole" label="Ole" property="ole">
          <CustomTableCell />
        </DataTableColumn>
        <DataTableColumn key="hannes" label="Hannes" property="hannes">
          <CustomTableCell />
        </DataTableColumn>
        <DataTableColumn key="louisa" label="Louisa" property="louisa">
          <CustomTableCell />
        </DataTableColumn>
        <DataTableColumn key="sonstige" label="Sonstige" property="sonstige">
          <CustomTableCell />
        </DataTableColumn>
      </DataTable>
    </div>
  );
};

export default SemesterTable;
