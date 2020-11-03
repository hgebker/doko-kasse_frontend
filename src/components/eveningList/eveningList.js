import { Fragment } from 'react';
import SplitViewHeader from '@salesforce/design-system-react/components/split-view/header';
import SplitViewListbox from '@salesforce/design-system-react/components/split-view/listbox';
import Button from '@salesforce/design-system-react/components/button';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import Icon from '@salesforce/design-system-react/components/icon';
import './eveningList.css';

export default function EveningList({ evenings, selection, onEveningSelected, onRefresh }) {
  return (
    <Fragment>
      <SplitViewHeader
        key="1"
        title="Abendübersicht"
        truncate
        variant="object-home"
        className="slds-var-p-around_small"
        icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
        onRenderActions={() => (
          <Fragment>
            <PageHeaderControl>
              <Button
                assistiveText={{ icon: 'Refresh' }}
                iconCategory="utility"
                iconName="refresh"
                iconVariant="border"
                variant="icon"
                className="refresh-button"
                onClick={onRefresh}
              />
            </PageHeaderControl>
          </Fragment>
        )}
      />

      <SplitViewListbox
        key="2"
        labels={{ header: 'Datum' }}
        options={evenings}
        events={{ onSelect: (_, { item }) => onEveningSelected(item) }}
        selection={selection}
        className="capitalize"
      />
    </Fragment>
  );
}
