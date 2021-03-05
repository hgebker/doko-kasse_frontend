import useReport from './useReport';
import SemesterTable from './semesterTable';
import CalculationTable from './calculationTable';
import { sortUtils } from 'services/utils';

import FormattedNumberField from 'components/base/formattedNumberField';
import FormattedTextField from 'components/base/formattedTextField';
import Card from '@salesforce/design-system-react/components/card';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  card: {
    '& .slds-table_bordered': {
      border: 'none'
    }
  }
});

const ReportFooter = ({ totalIncome, eveningCount, worst, best }) => {
  return (
    <dl className="slds-list_horizontal slds-wrap">
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Einnahmen gesamt:</dt>
      <dd className="slds-item_detail slds-truncate">
        <FormattedNumberField value={totalIncome} />
      </dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Anzahl Abende:</dt>
      <dd className="slds-item_detail slds-truncate">{eveningCount}</dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Schlechtester nach Schnitt (bereinigt):</dt>
      <dd className="slds-item_detail slds-truncate">
        <FormattedTextField value={worst} />
      </dd>
      <dt className="slds-item_label slds-text-color_weak slds-truncate">Bester nach Schnitt (bereinigt):</dt>
      <dd className="slds-item_detail slds-truncate">
        <FormattedTextField value={best} />
      </dd>
    </dl>
  );
};

const ReportDetails = ({ selectedSemester }) => {
  const [report, spinner] = useReport(selectedSemester);
  const classes = useStyles();

  if (!report) {
    return null;
  }

  const calculationItems = [
    { type: 'Summe', ...report.sumPerPlayer },
    { type: 'Schnitt', ...report.averagePerPlayer },
    { type: 'Minimum', ...report.minPerPlayer },
    { type: 'Maximum', ...report.maxPerPlayer },
    { type: 'Teilnahmen', ...report.noOfParticipationsPerPlayer }
  ];

  return (
    <Box position="relative">
      {spinner}

      <Card hasNoHeader footer={ReportFooter(report)} className={classes.card}>
        <p className="slds-text-heading_medium slds-var-m-around_small">Abende</p>
        <SemesterTable evenings={sortUtils.sortObjectArray(report.evenings, 'Datum', 'desc')} />

        <div className="slds-border_bottom slds-var-m-top_small" />

        <p className="slds-text-heading_medium slds-var-m-around_small">Berechnungen und Auswertungen</p>
        <CalculationTable items={calculationItems} />
      </Card>
    </Box>
  );
};

export default ReportDetails;
