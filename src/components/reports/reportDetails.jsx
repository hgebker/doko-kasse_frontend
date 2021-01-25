import useEvenings from './useEvenings';
import SemesterTable from './semesterTable';

import Icon from '@salesforce/design-system-react/components/icon';
import Card from '@salesforce/design-system-react/components/card';

const ReportDetails = ({ selectedSemester }) => {
  const evenings = useEvenings(selectedSemester);

  return (
    <Card heading={selectedSemester.label} icon={<Icon category="standard" name="event" />}>
      <SemesterTable evenings={evenings} />
    </Card>
  );
};

export default ReportDetails;
