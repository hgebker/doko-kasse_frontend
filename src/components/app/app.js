import React, { useState } from 'react';

import { IconSettings, BrandBand } from '@salesforce/design-system-react';
import NavigationBar from '../navigation/navigationBar/navigationBar';
import NavigationContent from '../navigation/navigationContent/navigationContent';
import NavigationList from '../navigation/navigationList/navigationList';
import './app.css';

const App = () => {
	const [activeContent, setActiveContent] = useState('item-1');
	const [navigationOpen, setNavigationOpen] = useState(false);

	const classes = `navigation-list ${navigationOpen ? 'navigation-list_open' : 'navigation-list_closed'}`;

	return (
		<IconSettings iconPath="/icons">
			<BrandBand theme="lightning-blue">
				<NavigationBar
					activeContent={activeContent}
					onActiveTabChange={setActiveContent}
					navigationOpen={navigationOpen}
					onOpenNavigation={setNavigationOpen}
				/>

				<div className="slds-is-relative">
					<div className={classes}>
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
	);
};

export default App;
