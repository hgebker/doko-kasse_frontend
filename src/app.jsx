import { useState } from 'react';

import BrandBand from '@salesforce/design-system-react/components/brand-band';
import NavigationBar from './components/navigation/navigationBar';
import NavigationContent from './components/navigation/navigationContent';
import NavigationDrawer from './components/navigation/navigationDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsnms from 'classnames';

const useStyles = makeStyles({
  preventScroll: {
    overflowY: 'hidden'
  }
});

export default function App() {
  const [activeContent, setActiveContent] = useState('item-1');
  const [navigationOpen, setNavigationOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <NavigationBar
        navigationOpen={navigationOpen}
        activeContent={activeContent}
        onActiveTabChange={setActiveContent}
        onOpenNavigation={setNavigationOpen}
      />

      <NavigationDrawer
        visible={navigationOpen}
        activeContent={activeContent}
        onActiveTabChange={setActiveContent}
        onClose={setNavigationOpen}
      />

      <Box position="relative" className={clsnms({ [classes.preventScroll]: navigationOpen })}>
        <BrandBand theme="lightning-blue">
          <NavigationContent activeContent={activeContent} />
        </BrandBand>
      </Box>
    </>
  );
}
