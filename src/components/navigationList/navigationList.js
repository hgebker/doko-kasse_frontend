import { Component } from 'react';
import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';
import { NAV_CATEGORIES } from '../../constants/navigation';
import './navigationList.css';

export default class NavigationList extends Component {
  handleSelect = (_, { item }) => {
    this.props.onActiveTabChange(item.id);
    this.props.onClose(false);
  };

  render = () => (
    <VerticalNavigation
      categories={NAV_CATEGORIES}
      selectedId={this.props.activeContent}
      onSelect={this.props.handleSelect}
      className={`slds-theme_default vertical-navigation ${this.props.visible ? 'open' : 'closed'}`}
    />
  );
}
