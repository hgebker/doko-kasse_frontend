import React, { useState } from 'react';
import './app.css';
import { IconSettings, BrandBand } from '@salesforce/design-system-react';
import NavigationBar from '../navigation/navigationBar/navigationBar';
import NavigationContent from '../navigation/navigationContent/navigationContent';
import NavigationList from '../navigation/navigationList/navigationList';

const App = () => {
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
};

export default App;
