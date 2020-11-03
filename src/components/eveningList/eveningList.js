import { Fragment } from 'react';
import SplitViewHeader from '@salesforce/design-system-react/components/split-view/header';
import SplitViewListbox from '@salesforce/design-system-react/components/split-view/listbox';
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import Icon from '@salesforce/design-system-react/components/icon';
import './eveningList.css';

const HeaderActions = (onNewClicked, onRefresh) => (
  <Fragment>
    <PageHeaderControl>
      <ButtonGroup variant="list">
        <Button label="Neu" onClick={onNewClicked} responsive />
        <Button
          assistiveText={{ icon: 'Refresh' }}
          iconCategory="utility"
          iconName="refresh"
          iconVariant="border-filled"
          variant="icon"
          className="refresh-button"
          onClick={onRefresh}
        />
      </ButtonGroup>
    </PageHeaderControl>
  </Fragment>
);

const HeaderControls = () => (
  <Fragment>
    <PageHeaderControl>
      <Button
        assistiveText={{ icon: 'Filters' }}
        iconCategory="utility"
        iconName="filterList"
        iconVariant="border-filled"
        variant="icon"
      />
    </PageHeaderControl>
  </Fragment>
);
export default function EveningList({ evenings, selection, onEveningSelected, onRefresh, onNewClicked, onSort }) {
  return (
    <Fragment>
      <SplitViewHeader
        key="1"
        title="Einnahmen"
        truncate
        variant="object-home"
        className="slds-var-p-around_small"
        icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
        info={`${evenings.length} Ergebnisse`}
        onRenderActions={() => HeaderActions(onNewClicked, onRefresh)}
        onRenderControls={() => HeaderControls()}
      />

      <SplitViewListbox
        key="2"
        labels={{ header: 'Datum' }}
        options={evenings}
        events={{
          onSelect: (_, { item }) => onEveningSelected(item),
          onSort: onSort
        }}
        selection={selection}
        className="capitalize"
      />
    </Fragment>
  );
}
