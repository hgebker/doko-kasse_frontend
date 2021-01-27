import { useState } from 'react';
import ReportSelection from './reportSelection';
import ReportDetails from './reportDetails';

import PageHeader from '@salesforce/design-system-react/components/page-header';
import Icon from '@salesforce/design-system-react/components/icon';

const ReportView = () => {
  const [selectedSemester, setSelectedSemester] = useState({ id: 'gesamt', label: 'Gesamt' });

  const handleSemesterSelect = selectedItem => {
    setSelectedSemester(selectedItem);
  };

  return (
    <>
      <PageHeader
        icon={<Icon assistiveText={{ label: 'Opportunity' }} category="standard" name="opportunity" />}
        label="Auswertungen"
        title="Auswertungen"
        truncate
        variant="object-home"
        className="slds-var-m-bottom_small"
      />

      <div className="slds-grid">
        <div className="slds-col slds-size_4-of-12 slds-var-p-right_small">
          <ReportSelection selectedSemester={selectedSemester} onSelect={handleSemesterSelect} />
        </div>

        <div className="slds-col slds-size_8-of-12">
          <ReportDetails selectedSemester={selectedSemester} />
        </div>
      </div>
    </>
  );
};

export default ReportView;
