import { Component } from 'react';
import { eveningsAPI } from '../../api';
import EveningOverviewComponents from './eveningOverviewComponents';
import { withToasts } from '../HOC/withToasts';
import { withSpinner } from '../HOC/withSpinner';
import flow from 'lodash/flow';

class EveningOverview extends Component {
  state = {
    evenings: []
  };

  componentDidMount = () => {
    this.handleRefresh();
  };

  handleRefresh = async () => {
    this.props.setLoading(true);
    try {
      this.setState({ evenings: await eveningsAPI.getEntries() });
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
      await eveningsAPI.createEntry(item);
      this.props.showToast('Erfolg!', 'Der Abend wurde erfolgreich gespeichert.', 'success');

      this.handleRefresh();
    } catch (error) {
      this.props.showToast('Ein Fehler ist aufgetreten!', 'Der Abend konnte nicht gespeichert werden.', 'success');
    } finally {
      this.props.setLoading(false);
    }
  };

  render = () => (
    <EveningOverviewComponents
      evenings={this.state.evenings}
      onSaveClicked={this.handleSaveClicked}
      onRefreshClicked={this.handleRefresh}
    />
  );
}

export default flow(withToasts, withSpinner)(EveningOverview);
