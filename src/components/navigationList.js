import { Component } from 'react';
import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';
import withStyles from '@material-ui/styles/withStyles';
import { NAV_CATEGORIES } from '../constants/navigation';

const styles = {
  'vertical-navigation': {
    height: '100%',
    width: '100vw',
    position: 'fixed'
  },

  open: {
    transform: 'translate(0, 0)',
    transition: 'transform 0.5s ease 0s'
  },

  closed: {
    transform: 'translate(0, 25%)',
    transition: 'transform 0.5s ease 0s'
  }
};

class NavigationList extends Component {
  handleSelect = (_, { item }) => {
    this.props.onActiveTabChange(item.id);
    this.props.onClose(false);
  };

  render = () => (
    <VerticalNavigation
      categories={NAV_CATEGORIES}
      selectedId={this.props.activeContent}
      onSelect={this.props.handleSelect}
      className={`slds-theme_default ${this.props.classes['vertical-navigation']} ${
        this.props.classes[this.props.visible ? 'open' : 'closed']
      }`}
    />
  );
}

export default withStyles(styles)(NavigationList);
