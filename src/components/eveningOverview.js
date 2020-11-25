import { Component } from 'react';
import { getEntries, createEntry } from '../services/dokoAbendeApi';
import EveningOverviewComponents from './eveningOverviewComponents';

export default class EveningOverview extends Component {
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
      this.setState({ evenings: await getEntries() });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSaveClicked = async item => {
    this.setState({ loading: true });
    try {
      await createEntry(item);
      this.handleRefresh();
    } catch (error) {
      console.error(error);
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
