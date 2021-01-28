import useReport from './useReport';
import SemesterTable from './semesterTable';
import CalculationTable from './calculationTable';
import { sortUtils, baseUtils } from 'services/utils';

import Icon from '@salesforce/design-system-react/components/icon';
import Card from '@salesforce/design-system-react/components/card';

const ReportFooter = ({ totalIncome, eveningCount, worst, best }) => {
  return (
    <dl className="slds-list_horizontal slds-wrap">
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Einnahmen gesamt:</dt>
      <dd className="slds-item_detail slds-truncate">{baseUtils.formatNumber(totalIncome)}</dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Anzahl Abende:</dt>
      <dd className="slds-item_detail slds-truncate">{eveningCount}</dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Schlechtester nach Schnitt (bereinigt):</dt>
      <dd className="slds-item_detail slds-truncate">{worst}</dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Bester nach Schnitt (bereinigt):</dt>
      <dd className="slds-item_detail slds-truncate">{best}</dd>
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
      <SemesterTable evenings={sortUtils.sortObjectArray(report.evenings, 'Datum', 'desc')} />

      <p className="slds-text-heading_medium slds-var-p-around_small slds-border_top">Berechnungen und Auswertungen</p>
      <CalculationTable items={calculationItems} />
    </Card>
  );
};

export default ReportDetails;
