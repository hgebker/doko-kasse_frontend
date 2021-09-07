import SemesterTable from './semesterTable';
import CalculationTable from './calculationTable';
import { sortUtils } from 'services/utils';

import FormattedNumberField from 'components/base/formattedNumberField';
import FormattedTextField from 'components/base/formattedTextField';
import Card from '@salesforce/design-system-react/components/card';
import Accordion from '@salesforce/design-system-react/components/accordion';
import AccordionPanel from '@salesforce/design-system-react/components/accordion/panel';
import Box from '@material-ui/core/Box';
import { useState } from 'react';

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

const ReportDetails = ({ report }) => {
  const [expandedSections, setExpandedSections] = useState({ calculations: true });

  if (!report) {
    return null;
  }

  const calculationItems = [
    { type: 'Summe', ...report.sumPerPlayer },
    { type: 'Schnitt', ...report.averagePerPlayer },
    { type: 'Minimum', ...report.minPerPlayer },
    { type: 'Maximum', ...report.maxPerPlayer }
  ];

  const accordionItems = [
    {
      id: 'evenings',
      summary: 'Abende',
      content: <SemesterTable evenings={sortUtils.sortObjectArray(report.evenings, 'Datum', 'desc')} />
    },
    {
      id: 'calculations',
      summary: 'Berechnungen und Auswertungen',
      content: <CalculationTable items={calculationItems} />
    }
  ];

  const handleTogglePanel = sectionId => {
    setExpandedSections(expandedSections => ({ ...expandedSections, [sectionId]: !expandedSections[sectionId] }));
  };

  return (
    <Box position="relative">
      <Card hasNoHeader footer={ReportFooter(report)}>
        <Accordion>
          {accordionItems.map(item => (
            <AccordionPanel
              key={item.id}
              id={item.id}
              summary={item.summary}
              expanded={expandedSections[item.id]}
              onTogglePanel={() => handleTogglePanel(item.id)}>
              {item.content}
            </AccordionPanel>
          ))}
        </Accordion>
      </Card>
    </Box>
  );
};

export default ReportDetails;
