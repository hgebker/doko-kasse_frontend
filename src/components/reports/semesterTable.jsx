import FormattedNumberField from 'components/base/formattedNumberField';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

import { useContext } from 'react';
import { MobileContext } from 'app';

const CustomTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    <FormattedNumberField value={children} />
  </DataTableCell>
);
CustomTableCell.displayName = DataTableCell.displayName;

const SemesterTable = ({ evenings }) => {
  const isMobile = useContext(MobileContext);

  return (
    <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
      <DataTable
        items={evenings}
        stackedHorizontal
        style={{ border: 'none' }}
        striped={isMobile}
        className="slds-var-p-horizontal_small">
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
      </DataTable>
    </div>
  );
};

export default SemesterTable;
