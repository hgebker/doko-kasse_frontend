import { Component } from 'react';
import SplitView from '@salesforce/design-system-react/components/split-view';
import Spinner from '@salesforce/design-system-react/components/spinner';
import Icon from '@salesforce/design-system-react/components/icon';
import Fab from '@material-ui/core/Fab';
import AddEveningModal from '../addEveningModal/addEveningModal';
import EveningList from '../eveningList/eveningList';
import EveningDetailCard from '../eveningDetailCard/eveningDetailCard';
import './eveningOverviewComponents.css';

const EveningOverviewMaster = (evenings, selectedEvening, onEveningSelected, onNewClicked, handleRefresh) => (
  <EveningList
    evenings={evenings}
    selection={[selectedEvening]}
    onEveningSelected={onEveningSelected}
    onRefresh={handleRefresh}
    onNewClicked={onNewClicked}
  />
);

const EveningOverviewDetail = (selectedEvening = {}) => <EveningDetailCard evening={selectedEvening.data} />;

export default class EveningOverviewComponents extends Component {
  state = {
    viewOpen: true,
    modalOpen: false,
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
    this.setState({ modalOpen: true });
  };

  render = () => (
    <>
      <div className="slds-is-relative">
        {this.props.loading && <Spinner variant="brand" />}

        <SplitView
          className="slds-theme_default slds-box slds-box_x-small container"
          isOpen={this.state.viewOpen}
          master={EveningOverviewMaster(
            this.props.evenings,
            this.state.selectedEvening,
            this.handleEveningSelected,
            this.handleOpenModal,
            this.props.onRefreshClicked
          )}
          detail={EveningOverviewDetail(this.state.selectedEvening)}
          events={{
            onClose: () => this.setState({ viewOpen: false }),
            onOpen: () => this.setState({ viewOpen: true })
          }}
        />
      </div>

      <Fab onClick={this.handleOpenModal} classes={{ root: 'add-button' }}>
        <Icon category="utility" name="add" />
      </Fab>

      <AddEveningModal
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
        onSave={item => {
          this.setState({ modalOpen: false });
          this.props.onSaveClicked(item);
        }}
      />
    </>
  );
}
