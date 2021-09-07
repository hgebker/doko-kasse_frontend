import FormattedNumberField from 'components/base/formattedNumberField';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CustomTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    <FormattedNumberField value={children} />
  </DataTableCell>
);
CustomTableCell.displayName = DataTableCell.displayName;

const CalculationTable = ({ items }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
      <DataTable
        items={items}
        stackedHorizontal
        style={{ border: 'none' }}
        striped={isMobile}
        className="slds-var-p-horizontal_small">
        <DataTableColumn key="type" label="Typ" property="type" />
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

export default CalculationTable;
