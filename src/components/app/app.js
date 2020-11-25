import { useState } from 'react';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import BrandBand from '@salesforce/design-system-react/components/brand-band';
import NavigationBar from '../navigationBar';
import NavigationContent from '../navigationContent';
import NavigationList from '../navigationList';
import './app.css';

export default function App() {
  const [activeContent, setActiveContent] = useState('item-1');
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <IconSettings iconPath="/icons">
      <NavigationBar
        activeContent={activeContent}
        onActiveTabChange={setActiveContent}
        navigationOpen={navigationOpen}
        onOpenNavigation={setNavigationOpen}
      />

      <div className={`slds-is-relative ${navigationOpen && 'prevent-scrolling'}`}>
        <div className={`navigation-list ${navigationOpen ? 'navigation-list_open' : 'navigation-list_closed'}`}>
          <NavigationList
            visible={navigationOpen}
            activeContent={activeContent}
            onActiveTabChange={setActiveContent}
            onClose={setNavigationOpen}
          />
        </div>

        <BrandBand theme="lightning-blue">
          <NavigationContent activeContent={activeContent} />
        </BrandBand>
      </div>
    </IconSettings>
  );
}
