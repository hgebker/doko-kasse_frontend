import { useState } from 'react';
import useEvenings from './useEvenings';
import { SEMESTER_OPTIONS } from '../../constants/semester';

import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import Icon from '@salesforce/design-system-react/components/icon';
import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';
import Card from '@salesforce/design-system-react/components/card';
import { formatNumber } from '../evenings/eveningHelper';

const CustomTableCell = ({ children, ...props }) => <DataTableCell {...props}>{formatNumber(children)}</DataTableCell>;
CustomTableCell.displayName = DataTableCell.displayName;

const ReportView = () => {
  const [selectedSemester, setSelectedSemester] = useState(SEMESTER_OPTIONS[0].items[0]);
  const evenings = useEvenings(selectedSemester);

  const handleSemesterSelect = (_, data) => {
    setSelectedSemester(data.item);
  };

  return (
    <>
      <PageHeader
        icon={<Icon assistiveText={{ label: 'Opportunity' }} category="standard" name="opportunity" />}
        label="Auswertungen"
        title="Test"
        truncate
        variant="object-home"
        className="slds-var-m-bottom_small"
      />

      <div className="slds-grid">
        <div className="slds-col slds-size_4-of-12 slds-var-p-right_small">
          <VerticalNavigation
            categories={SEMESTER_OPTIONS}
            selectedId={selectedSemester.id}
            onSelect={handleSemesterSelect}
            className="slds-theme_default slds-box"
          />
        </div>

        <div className="slds-col slds-size_8-of-12">
          <Card heading={selectedSemester.label} icon={<Icon category="standard" name="event" />}>
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
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReportView;
