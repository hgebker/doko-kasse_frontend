import { VerticalNavigation } from '@salesforce/design-system-react';
import { NAV_CATEGORIES } from '../../constants/navigation';
import './navigationList.css';

const NavigationList = ({ visible, activeContent, onActiveTabChange, onClose }) => {
  const classes = `slds-theme_default vertical-navigation ${visible ? 'open' : 'closed'}`;

  const handleSelect = (_, { item }) => {
    onActiveTabChange(item.id);
    onClose(false);
  };

  return (
    <VerticalNavigation
      categories={NAV_CATEGORIES}
      selectedId={activeContent}
      onSelect={handleSelect}
      className={classes}
    />
  );
};

export default NavigationList;
