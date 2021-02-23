import { FC, useState } from 'react';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import SplitViewListbox from '@salesforce/design-system-react/components/split-view/listbox';
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import Dropdown from '@salesforce/design-system-react/components/menu-dropdown';
import Icon from '@salesforce/design-system-react/components/icon';
import { LIST_OPTIONS } from 'constants/semester';

import { sortUtils } from 'services/utils';

import { SEMESTER_LABEL } from 'constants/semester';
import { formatNumber } from 'services/utils/baseUtils';

const SELECTION_CATEGORIES = [
  {
    id: 'gesamt',
    label: 'Gesamt'
  },
  { type: 'divider' },
  ...LIST_OPTIONS
];

const NameSwitcherDropdown = ({ onSelect }) => {
  return (
    <Dropdown
      buttonClassName="slds-button_icon-small"
      buttonVariant="icon"
      iconCategory="utility"
      iconName="down"
      menuPosition="overflowBoundaryElement"
      options={SELECTION_CATEGORIES}
      onSelect={onSelect}
    />
  );
};

const HeaderActions = (onNewClicked: () => void, onRefresh: () => void) => {
  return (
    <ButtonGroup variant="list">
      <Button label="Neu" onClick={onNewClicked} responsive />
      <Button
        assistiveText={{ icon: 'Refresh' }}
        iconCategory="utility"
        iconName="refresh"
        iconVariant="border-filled"
        variant="icon"
        onClick={onRefresh}
        responsive
      />
    </ButtonGroup>
  );
};

interface Props {
  evenings: Evening[];
  selectedEvening: Evening | null;
  onEveningSelected: (evening: Evening) => void;
  selectedSemester: { id: string; label: string };
  onSemesterSelected: (semester: { id: string; label: string }) => void;
  onNewClicked: () => void;
  onRefresh: () => void;
}

const EveningList: FC<Props> = ({
  evenings,
  selectedEvening,
  onEveningSelected,
  selectedSemester,
  onSemesterSelected,
  ...actionsProps
}) => {
  const [sortDirection, setSortDirection] = useState(sortUtils.SORT_OPTIONS.UP);

  const sortedList = sortUtils.sortObjectArray(evenings, 'Datum', sortDirection);
  const options = sortedList.map(evening => ({
    id: evening.Datum,
    label: evening.Datum,
    bottomLeftText: SEMESTER_LABEL[evening.semester],
    topRightText: 'Gesamt:',
    bottomRightText: formatNumber(evening.sum)
  }));
  const selectedOption = options.find(option => option.id === selectedEvening?.Datum);

  const handleEveningSelected = (selectedEvening: { id: string }) => {
    const foundEvening = evenings.find(({ Datum }) => Datum === selectedEvening.id);

    if (foundEvening) {
      onEveningSelected(foundEvening);
    }
  };

  const handleSort = () => {
    const { DOWN, UP } = sortUtils.SORT_OPTIONS;
    setSortDirection(sortDirection => (sortDirection === DOWN ? UP : DOWN));
  };

  return (
    <>
      <PageHeader
        title={selectedSemester.label}
        label="Einnahmen"
        variant="object-home"
        className="slds-var-p-around_small"
        icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
        info={`${options.length} Ergebnisse`}
        onRenderActions={() => HeaderActions(actionsProps.onNewClicked, actionsProps.onRefresh)}
        nameSwitcherDropdown={<NameSwitcherDropdown onSelect={onSemesterSelected} />}
      />

      {SplitViewListbox({
        labels: { header: 'Datum' },
        options,
        events: {
          // onSelect: (v:any) => handleEveningSelected(item),
          onSelect: (v: any) => console.log(v),
          onSort: handleSort
        },
        sortDirection,
        selection: [selectedOption],
        className: 'capitalize'
      })}
    </>
  );
};

export default EveningList;
