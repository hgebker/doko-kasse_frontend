import { Component } from 'react';
import flow from 'lodash/flow';
import classNames from 'classnames';

import { eveningsAPI } from '../../api';
import { withToasts } from '../HOC/withToasts';
import { withSpinner } from '../HOC/withSpinner';
import { withModal } from '../HOC/withModal';
import { sortUtils } from '../../services';
import { SEMESTER_LABEL } from '../../constants/semester';
import { parseSum } from './eveningHelper';

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
    evenings: [],
    viewOpen: true,
    selectedEvening: null,
    sortDirection: sortUtils.SORT_OPTIONS.UP
  };

  componentDidMount = () => {
    this.handleRefresh();
  };

  componentDidUpdate(_, prevState) {
    if (this.state.evenings !== prevState.evenings) {
      this.setState({ selectedEvening: this.sortedList[0] });
    }
  }

  handleRefresh = async () => {
    this.props.setLoading(true);
    try {
      this.setState({ evenings: await eveningsAPI.listEvenings() });
    } catch (error) {
      this.props.showToast('Ein Fehler ist aufgetreten!', 'Abende konnten nicht geladen werden.', 'error');
      this.setState({ evenings: [] });
    } finally {
      this.props.setLoading(false);
    }
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

  handleEveningSelected = selectedEvening => {
    this.setState({ selectedEvening: this.state.evenings.find(({ Datum }) => Datum === selectedEvening.id) });
  };

  handleOpenModal = () => {
    this.props.openModal(this.formModalConfig);
  };

  handleSort = () => {
    const { DOWN, UP } = sortUtils.SORT_OPTIONS;
    this.setState(state => ({ sortDirection: state.sortDirection === DOWN ? UP : DOWN }));
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

  get sortedList() {
    return sortUtils.sortObjectArray(this.state.evenings, 'Datum', this.state.sortDirection);
  }

  render = () => (
    <>
      <SplitView
        className={classNames('slds-theme_default slds-box slds-box_x-small', this.props.classes.container)}
        isOpen={this.state.viewOpen}
        master={
          <EveningList
            options={this.sortedList.map(evening => ({
              id: evening.Datum,
              label: evening.Datum,
              bottomLeftText: SEMESTER_LABEL[evening.semester],
              topRightText: 'Gesamt:',
              bottomRightText: parseSum(evening)
            }))}
            selectedEvening={this.state.selectedEvening}
            onEveningSelected={this.handleEveningSelected}
            onRefresh={this.handleRefresh}
            onNewClicked={this.handleOpenModal}
            onSort={this.handleSort}
            sortDirection={this.state.sortDirection}
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
