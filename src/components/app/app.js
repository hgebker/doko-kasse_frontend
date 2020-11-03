import { useState } from 'react';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import BrandBand from '@salesforce/design-system-react/components/brand-band';
import NavigationBar from '../navigationBar/navigationBar';
import NavigationContent from '../navigationContent/navigationContent';
import NavigationList from '../navigationList/navigationList';
import './app.css';

export default function App() {
  const [activeContent, setActiveContent] = useState('item-1');
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <div className={`body ${navigationOpen && 'prevent-scrolling'}`}>
      <IconSettings iconPath="/icons">
        <BrandBand theme="lightning-blue">
          <NavigationBar
            activeContent={activeContent}
            onActiveTabChange={setActiveContent}
            navigationOpen={navigationOpen}
            onOpenNavigation={setNavigationOpen}
          />

          <div className="slds-is-relative relative-container">
            <div className={`navigation-list ${navigationOpen ? 'navigation-list_open' : 'navigation-list_closed'}`}>
              <NavigationList
                visible={navigationOpen}
                activeContent={activeContent}
                onActiveTabChange={setActiveContent}
                onClose={setNavigationOpen}
              />
            </div>

            <NavigationContent activeContent={activeContent} />
          </div>
        </BrandBand>
      </IconSettings>
    </div>
  );
}
