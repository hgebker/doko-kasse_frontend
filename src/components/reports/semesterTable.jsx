import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';

import BaseTable from 'components/base/baseTable';
import BaseTableNumberCell from 'components/base/baseTableNumberCell';

const COLUMNS = [
  <DataTableColumn key="datum" label="Datum" property="Datum" />,
  <DataTableColumn key="tim" label="Tim" property="tim">
    <BaseTableNumberCell />
  </DataTableColumn>,
  <DataTableColumn key="jan" label="Jan" property="jan">
    <BaseTableNumberCell />
  </DataTableColumn>,
  <DataTableColumn key="ole" label="Ole" property="ole">
    <BaseTableNumberCell />
  </DataTableColumn>,
  <DataTableColumn key="hannes" label="Hannes" property="hannes">
    <BaseTableNumberCell />
  </DataTableColumn>,
  <DataTableColumn key="louisa" label="Louisa" property="louisa">
    <BaseTableNumberCell />
  </DataTableColumn>
];

export default function SemesterTable({ evenings }) {
  return <BaseTable items={evenings} columns={COLUMNS} maxHeight="40vh" />;
}
