import { useState } from 'react';
import ReportSelection from './reportSelection';
import ReportDetails from './reportDetails';

import PageHeader from '@salesforce/design-system-react/components/page-header';
import Icon from '@salesforce/design-system-react/components/icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';

const ReportView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('xs'));
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
        {isMobile ? (
          <Drawer anchor="right">
            <ReportSelection selectedSemester={selectedSemester} onSelect={handleSemesterSelect} />
          </Drawer>
        ) : (
          <div className="slds-col slds-size_4-of-12 slds-var-p-right_small">
            <ReportSelection selectedSemester={selectedSemester} onSelect={handleSemesterSelect} />
          </div>
        )}

        <div className="slds-col slds-size_1-of-1 slds-medium-size_8-of-12">
          <ReportDetails selectedSemester={selectedSemester} />
        </div>
      </div>
    </>
  );
};

export default ReportView;
