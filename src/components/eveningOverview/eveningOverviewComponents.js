import { Component, Fragment } from 'react';
import SplitView from '@salesforce/design-system-react/components/split-view';
import Spinner from '@salesforce/design-system-react/components/spinner';
import Icon from '@salesforce/design-system-react/components/icon';
import Fab from '@material-ui/core/Fab';
import AddEveningModal from '../addEveningModal/addEveningModal';
import EveningList from '../eveningList/eveningList';
import EveningDetailCard from '../eveningDetailCard/eveningDetailCard';

const EveningOverviewMaster = (evenings, selectedEvening, onEveningSelected, handleRefresh) => (
  <EveningList
    evenings={evenings}
    selection={[selectedEvening]}
    onEveningSelected={onEveningSelected}
    onRefresh={handleRefresh}
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

  handleEveningSelected = selectedEvening => this.setState({ selectedEvening });

  render = () => {
    const { evenings, loading, onSaveClicked, onRefreshClicked } = this.props;

    return (
      <Fragment>
        <div className="slds-is-relative">
          {loading && <Spinner variant="brand" />}

          <SplitView
            className="slds-theme_default slds-box slds-box_x-small container"
            isOpen={this.state.viewOpen}
            master={EveningOverviewMaster(
              evenings,
              this.state.selectedEvening,
              this.handleEveningSelected,
              onRefreshClicked
            )}
            detail={EveningOverviewDetail(this.state.selectedEvening)}
            events={{
              onClose: () => this.setState({ viewOpen: false }),
              onOpen: () => this.setState({ viewOpen: true })
            }}
          />
        </div>

        <Fab onClick={() => this.setState({ modalOpen: true })} classes={{ root: 'add-button' }}>
          <Icon category="utility" name="add" />
        </Fab>

        <AddEveningModal
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          onSave={item => {
            this.setState({ modalOpen: false });
            onSaveClicked(item);
          }}
        />
      </Fragment>
    );
  };
}
