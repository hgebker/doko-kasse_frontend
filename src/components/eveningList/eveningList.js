import { Fragment, Component } from 'react';
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
          responsive
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

const SORT_OPTIONS = {
  UP: 'up',
  DOWN: 'down'
};

export default class EveningList extends Component {
  state = {
    sortDirection: SORT_OPTIONS.UP,
    sortedList: []
  };

  componentDidUpdate(prevProps) {
    if (this.props.evenings !== prevProps.evenings) {
      this.setState({ sortedList: this.props.evenings });
    }
  }

  handleSort = () => {
    const sortDirection = this.state.sortDirection === SORT_OPTIONS.DOWN ? SORT_OPTIONS.UP : SORT_OPTIONS.DOWN;
    const inverse = this.state.sortDirection === SORT_OPTIONS.DOWN ? 1 : -1;

    this.setState({
      sortedList: this.state.sortedList.sort((a, b) => inverse * ((a.label > b.label) - (b.label > a.label))),
      sortDirection
    });
  };

  render = () => (
    <Fragment>
      <SplitViewHeader
        key="1"
        title="Einnahmen"
        label="Abende"
        truncate
        variant="object-home"
        className="slds-var-p-around_small"
        icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
        info={`${this.props.evenings.length} Ergebnisse`}
        onRenderActions={() => HeaderActions(this.props.onNewClicked, this.props.onRefresh)}
        onRenderControls={() => HeaderControls()}
      />

      <SplitViewListbox
        key="2"
        labels={{ header: 'Datum' }}
        options={this.props.evenings}
        events={{
          onSelect: (_, { item }) => this.props.onEveningSelected(item),
          onSort: this.handleSort
        }}
        sortDirection={this.state.sortDirection}
        selection={this.props.selection}
        className="capitalize"
      />
    </Fragment>
  );
}
