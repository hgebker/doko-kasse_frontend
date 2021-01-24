import { Component } from 'react';
import { eveningsAPI } from '../../api';
import EveningOverviewComponents from './eveningOverviewComponents';
import { withToasts } from '../HOC/withToasts';

class EveningOverview extends Component {
  state = {
    evenings: [],
    loading: false
  };

  componentDidMount = () => {
    this.handleRefresh();
  };

  handleRefresh = async () => {
    this.setState({ loading: true });
    try {
      this.setState({ evenings: await eveningsAPI.getEntries() });
    } catch (error) {
      this.props.showToast('Ein Fehler ist aufgetreten!', 'Abende konnten nicht geladen werden.', 'error');
      this.setState({ evenings: [] });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSaveClicked = async item => {
    this.setState({ loading: true });
    try {
      await eveningsAPI.createEntry(item);
      this.props.showToast('Erfolg!', 'Der Abend wurde erfolgreich gespeichert.', 'success');

      this.handleRefresh();
    } catch (error) {
      this.props.showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht gespeichert werden.', 'success');
    } finally {
      this.setState({ loading: false });
    }
  };

  render = () => (
    <EveningOverviewComponents
      evenings={this.state.evenings}
      loading={this.state.loading}
      onSaveClicked={this.handleSaveClicked}
      onRefreshClicked={this.handleRefresh}
    />
  );
}

export default withToasts(EveningOverview);
