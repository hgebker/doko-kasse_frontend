import React, { useState, useEffect } from 'react';
import {
	GlobalNavigationBar,
	GlobalNavigationBarRegion,
	GlobalNavigationBarButton
} from '@salesforce/design-system-react';

const NavigationBar = ({ onActiveTabChange }) => {
	const [currentTab, setCurrentTab] = useState('item-1');

	const NavigationButton = ({ id, label, onClick }) => (
		<GlobalNavigationBarButton id={id} label={label} active={currentTab === id} onClick={onClick} />
	);

	const handleButtonClicked = event => setCurrentTab(event.target.id);

	const changeContent = () => onActiveTabChange(currentTab);

	useEffect(changeContent, [currentTab]);

	return (
		<GlobalNavigationBar>
			<GlobalNavigationBarRegion region="primary">
				<h1 className="slds-text-heading_medium slds-align-content-center slds-var-p-horizontal_small">
					Doko Kartclub Münster e.V
				</h1>
			</GlobalNavigationBarRegion>

			<GlobalNavigationBarRegion region="secondary" navigation>
				<NavigationButton id="item-1" label="Übersicht" onClick={handleButtonClicked} />
				<NavigationButton id="item-2" label="Auswertungen" onClick={handleButtonClicked} />
			</GlobalNavigationBarRegion>
		</GlobalNavigationBar>
	);
};

export default NavigationBar;
