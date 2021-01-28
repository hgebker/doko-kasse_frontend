import { Component } from 'react';
import SplitViewHeader from '@salesforce/design-system-react/components/split-view/header';
import SplitViewListbox from '@salesforce/design-system-react/components/split-view/listbox';
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import PageHeaderControl from '@salesforce/design-system-react/components/page-header/control';
import Icon from '@salesforce/design-system-react/components/icon';
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  '@keyframes rotate': {
    to: {
      transform: 'rotate(360deg)'
    }
  },
  refreshButton: {
    '&:hover': {
      '& svg': {
        animation: `$rotate 0.4s ease`
      }
    }
  }
};

class EveningList extends Component {
  get HeaderActions() {
    return (
      <>
        <PageHeaderControl>
          <ButtonGroup variant="list">
            <Button label="Neu" onClick={this.props.onNewClicked} responsive />
            <Button
              assistiveText={{ icon: 'Refresh' }}
              iconCategory="utility"
              iconName="refresh"
              iconVariant="border-filled"
              variant="icon"
              className={this.props.classes.refreshButton}
              onClick={this.props.onRefresh}
              responsive
            />
          </ButtonGroup>
        </PageHeaderControl>
      </>
    );
  }

  get HeaderControls() {
    return (
      <>
        <PageHeaderControl>
          <Button
            assistiveText={{ icon: 'Filters' }}
            iconCategory="utility"
            iconName="filterList"
            iconVariant="border-filled"
            variant="icon"
          />
        </PageHeaderControl>
      </>
    );
  }

  get selectedOption() {
    return this.props.options.find(option => option.id === this.props.selectedEvening?.Datum);
  }

  render = () => (
    <>
      <SplitViewHeader
        key="1"
        title="Einnahmen"
        label="Abende"
        truncate
        variant="object-home"
        className="slds-var-p-around_small"
        icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
        info={`${this.props.options.length} Ergebnisse`}
        onRenderActions={() => this.HeaderActions}
      />

      <SplitViewListbox
        key="2"
        labels={{ header: 'Datum' }}
        options={this.props.options}
        events={{
          onSelect: (_, { item }) => this.props.onEveningSelected(item),
          onSort: () => this.props.onSort()
        }}
        sortDirection={this.props.sortDirection}
        selection={[this.selectedOption]}
        className="capitalize"
      />
    </>
  );
}

export default withStyles(styles)(EveningList);
