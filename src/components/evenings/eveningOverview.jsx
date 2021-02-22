import { Component } from 'react';
import flow from 'lodash/flow';
import classNames from 'classnames';

import { eveningsAPI } from 'api';
import { withToasts } from '../HOC/withToasts';
import { withSpinner } from '../HOC/withSpinner';
import { withModal } from '../HOC/withModal';

import AddEveningForm from './eveningForm';
import EveningList from './eveningList';
import EveningDetailCard from './eveningDetailCard';

import SplitView from '@salesforce/design-system-react/components/split-view';
import Icon from '@salesforce/design-system-react/components/icon';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/styles/withStyles';

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

class EveningOverview extends Component {
  state = {
    viewOpen: true,
    selectedEvening: null
  };

  handleEveningSelected = selectedEvening => {
    this.setState({ selectedEvening });
  };

  handleSaveClicked = async item => {
    this.props.setLoading(true);
    try {
      const newEvening = await eveningsAPI.createEvening(item);

      this.setState(state => ({ evenings: [...state.evenings, newEvening], selectedEvening: newEvening }));
      this.props.showToast('Erfolg!', 'Der Abend wurde erfolgreich gespeichert.', 'success');
    } catch (error) {
      this.props.showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht gespeichert werden.', 'success');
    } finally {
      this.props.setLoading(false);
    }
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
            this.handleSaveClicked(childState.item);
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
            selectedEvening={this.state.selectedEvening}
            onEveningSelected={this.handleEveningSelected}
            onNewClicked={this.handleOpenModal}
          />
        }
        detail={<EveningDetailCard evening={this.state.selectedEvening} />}
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

export default flow(withStyles(styles), withModal, withToasts, withSpinner)(EveningOverview);
