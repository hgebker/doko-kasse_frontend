import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';
import { NAV_CATEGORIES } from '../../constants/navigation';
import './navigationList.css';

export default function NavigationList({ visible, activeContent, onActiveTabChange, onClose }) {
  const handleSelect = (_, { item }) => {
    onActiveTabChange(item.id);
    onClose(false);
  };

  return (
    <VerticalNavigation
      categories={NAV_CATEGORIES}
      selectedId={activeContent}
      onSelect={handleSelect}
      className={`slds-theme_default vertical-navigation ${visible ? 'open' : 'closed'}`}
    />
  );
}
