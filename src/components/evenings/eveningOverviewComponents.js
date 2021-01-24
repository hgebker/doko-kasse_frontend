import { Component } from 'react';
import SplitView from '@salesforce/design-system-react/components/split-view';
import Icon from '@salesforce/design-system-react/components/icon';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/styles/withStyles';
import AddEveningForm from './eveningForm';
import EveningList from './eveningList';
import EveningDetailCard from './eveningDetailCard';
import flow from 'lodash/flow';
import { withModal } from '../HOC/withModal';
import classNames from 'classnames';

const styles = {
  addButton: {
    backgroundColor: '#0070d2 !important',
    position: 'fixed !important',
    right: '5%',
    bottom: '5%',
    '& svg': {
      fill: '#fff'
    }
  },
  '@media screen and (min-width: 500px)': {
    container: {
      maxHeight: '90vh'
    }
  }
};

class EveningOverviewComponents extends Component {
  state = {
    viewOpen: true,
    selectedEvening: {}
  };

  componentDidUpdate(prevProps) {
    if (this.props.evenings !== prevProps.evenings) {
      this.setState({ selectedEvening: this.props.evenings[0] });
    }
  }

  handleEveningSelected = selectedEvening => {
    this.setState({ selectedEvening });
  };

  handleOpenModal = () => {
    this.props.openModal(this.formModalConfig);
  };

  get formModalConfig() {
    return {
      heading: 'Abend anlegen',
      buttons: [
        {
          label: 'Abbrechen'
        },
        {
          label: 'Speichern',
          variant: 'brand',
          action: childState => {
            this.props.onSaveClicked(childState.item);
          }
        }
      ],
      child: {
        type: AddEveningForm,
        attributes: {}
      },
      options: {
        dismissOnClickOutside: false
      }
    };
  }

  render = () => (
    <>
      <SplitView
        className={classNames('slds-theme_default slds-box slds-box_x-small', this.props.classes.container)}
        isOpen={this.state.viewOpen}
        master={
          <EveningList
            evenings={this.props.evenings}
            selection={[this.state.selectedEvening]}
            onEveningSelected={this.handleEveningSelected}
            onRefresh={this.props.onRefreshClicked}
            onNewClicked={this.handleOpenModal}
          />
        }
        detail={<EveningDetailCard evening={this.state.selectedEvening ? this.state.selectedEvening.data : {}} />}
        events={{
          onClose: () => this.setState({ viewOpen: false }),
          onOpen: () => this.setState({ viewOpen: true })
        }}
      />

      <Fab onClick={this.handleOpenModal} classes={{ root: this.props.classes.addButton }}>
        <Icon category="utility" name="add" />
      </Fab>
    </>
  );
}

const enhanced = flow(withStyles(styles), withModal);

export default enhanced(EveningOverviewComponents);
