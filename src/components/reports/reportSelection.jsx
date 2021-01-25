import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';
import { SEMESTER_OPTIONS } from '../../constants/semester';

const ReportSelection = ({ onSelect, selectedSemester }) => {
  const handleSemesterSelect = (_, data) => {
    onSelect(data.item);
  };

  return (
    <VerticalNavigation
      categories={SEMESTER_OPTIONS}
      selectedId={selectedSemester.id}
      onSelect={handleSemesterSelect}
      className="slds-theme_default slds-box"
    />
  );
};

export default ReportSelection;
