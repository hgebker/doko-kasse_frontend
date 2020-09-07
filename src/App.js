import React, { useState } from 'react';

import { IconSettings, BrandBand } from '@salesforce/design-system-react';
import NavigationBar from './components/NavigationBar';
import NavigationContent from './components/NavigationContent';

const App = () => {
	const [activeContent, setActiveContent] = useState('');

	return (
		<IconSettings iconPath="/icons">
			<BrandBand theme="lightning-blue">
				<NavigationBar onActiveTabChange={setActiveContent} />
				<NavigationContent activeContent={activeContent} />
			</BrandBand>
		</IconSettings>
	);
};

export default App;
