import { useState } from 'react';
import SplitViewHeader from '@salesforce/design-system-react/components/split-view/header';
import SplitViewListbox from '@salesforce/design-system-react/components/split-view/listbox';
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import Icon from '@salesforce/design-system-react/components/icon';

import { sortUtils } from 'services/utils';

import { SEMESTER_LABEL } from 'constants/semester';
import { formatNumber } from 'services/utils/baseUtils';
import ChangeViewDropdown from 'components/base/changeViewDropdown';
import NameSwitcherDropdown from 'components/base/nameSwitcherDropdown';

const HeaderActions = (onNewClicked, onRefresh) => {
  return (
    <PageHeaderControl>
      <ButtonGroup variant="list">
        <Button label="Neu" onClick={() => onNewClicked()} responsive />
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
    </PageHeaderControl>
  );
};

const HeaderControls = (selectedView, onViewChange) => (
  <PageHeaderControl>
    <ChangeViewDropdown selectedView={selectedView} onSelect={onViewChange} />
  </PageHeaderControl>
);

const EveningList = ({
  evenings,
  selectedEvening,
  onEveningSelected,
  selectedSemester,
  onSemesterSelected,
  onNewClicked,
  onRefresh,
  selectedView,
  onViewChange
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

  const handleEveningSelected = selectedEvening => {
    onEveningSelected(evenings.find(({ Datum }) => Datum === selectedEvening.id));
  };

  const handleSort = () => {
    const { DOWN, UP } = sortUtils.SORT_OPTIONS;
    setSortDirection(sortDirection => (sortDirection === DOWN ? UP : DOWN));
  };

  return (
    <>
      <SplitViewHeader
        key="1"
        title={selectedSemester.label}
        label="Reg. Einnahmen"
        truncate
        variant="object-home"
        className="slds-var-p-around_small"
        icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
        info={`${options.length} Ergebnisse`}
        onRenderActions={() => HeaderActions(onNewClicked, onRefresh)}
        onRenderControls={() => HeaderControls(selectedView, onViewChange)}
        nameSwitcherDropdown={<NameSwitcherDropdown onSelect={onSemesterSelected} />}
      />

      <SplitViewListbox
        key="2"
        labels={{ header: 'Datum' }}
        options={options}
        events={{
          onSelect: (_, { item }) => handleEveningSelected(item),
          onSort: handleSort
        }}
        sortDirection={sortDirection}
        selection={[selectedOption]}
        className="capitalize"
      />
    </>
  );
};

export default EveningList;
