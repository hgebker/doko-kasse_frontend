import useReport from './useReport';
import SemesterTable from './semesterTable';
import CalculationTable from './calculationTable';

import Icon from '@salesforce/design-system-react/components/icon';
import Card from '@salesforce/design-system-react/components/card';
import { formatNumber } from '../evenings/eveningHelper';

const ReportFooter = ({ totalIncome, eveningCount }) => {
  return (
    <dl className="slds-list_horizontal slds-wrap">
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Einnahmen gesamt:</dt>
      <dd className="slds-item_detail slds-truncate">{formatNumber(totalIncome)}</dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Anzahl Abende:</dt>
      <dd className="slds-item_detail slds-truncate">{eveningCount}</dd>
    </dl>
  );
};

const ReportDetails = ({ selectedSemester }) => {
  const report = useReport(selectedSemester);

  if (!report) {
    return null;
  }

  const calculationItems = [
    { type: 'Summe', ...report.sumPerPlayer },
    { type: 'Schnitt', ...report.averagePerPlayer },
    { type: 'Minimum', ...report.minPerPlayer },
    { type: 'Maximum', ...report.maxPerPlayer }
  ];

  return (
    <Card
      heading={selectedSemester.label}
      icon={<Icon category="standard" name="event" />}
      footer={ReportFooter(report)}>
      <SemesterTable evenings={report.evenings} />
      <CalculationTable items={calculationItems} />
    </Card>
  );
};

export default ReportDetails;
