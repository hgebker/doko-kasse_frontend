import { useState } from 'react';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import BrandBand from '@salesforce/design-system-react/components/brand-band';
import NavigationBar from './navigation/navigationBar';
import NavigationContent from './navigation/navigationContent';
import NavigationList from './navigation/navigationList';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
  preventScroll: {
    overflowY: 'hidden'
  },
  navList: {
    position: 'absolute',
    height: '100%',
    inset: '0 0 0 0',
    zIndex: 2,
    overflowY: 'auto',
    transition: 'opacity 0.5s ease 0s'
  },
  navListClosed: {
    opacity: 0,
    pointerEvents: 'none'
  },
  navListOpen: {
    opacity: 1,
    pointerEvents: 'all'
  }
});

export default function App() {
  const [activeContent, setActiveContent] = useState('item-1');
  const [navigationOpen, setNavigationOpen] = useState(false);
  const classes = useStyles();

  const containerClass = classNames('slds-is-relative container', { [classes.preventScroll]: navigationOpen });
  const listClass = classNames(classes.navList, {
    [classes.navListClosed]: !navigationOpen,
    [classes.navListOpen]: navigationOpen
  });

  return (
    <IconSettings iconPath="/icons">
      <NavigationBar
        activeContent={activeContent}
        onActiveTabChange={setActiveContent}
        navigationOpen={navigationOpen}
        onOpenNavigation={setNavigationOpen}
      />
      <div className={containerClass}>
        <div className={listClass}>
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
