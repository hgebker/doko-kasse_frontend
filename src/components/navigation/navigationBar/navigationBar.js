import React from 'react';
import { NAV_ITEMS } from '../navConstants';
import './navigationBar.css';
import {
	GlobalNavigationBar,
	GlobalNavigationBarRegion,
	GlobalNavigationBarButton,
	Button
} from '@salesforce/design-system-react';

const NavigationBar = ({ activeContent, onActiveTabChange, navigationOpen, onOpenNavigation }) => {
	const handleButtonClicked = event => onActiveTabChange(event.target.id);
	const handleOpenNavigation = () => onOpenNavigation(!navigationOpen);

	return (
		<GlobalNavigationBar className="navigation-bar">
			<GlobalNavigationBarRegion className="navigation-bar_launcher-region" region="primary">
				<Button variant="icon" iconCategory="utility" iconName="rows" iconSize="large" onClick={handleOpenNavigation} />
				<h1 className="slds-text-heading_medium slds-align-content-center slds-var-p-horizontal_small">
					Doko Kartclub Münster e.V
				</h1>
			</GlobalNavigationBarRegion>

			<GlobalNavigationBarRegion className="navigation-bar_nav-region" region="secondary" navigation>
				{NAV_ITEMS.map(({ id, label }) => (
					<GlobalNavigationBarButton
						key={id}
						id={id}
						label={label}
						active={activeContent === id}
						onClick={handleButtonClicked}
					/>
				))}
			</GlobalNavigationBarRegion>
		</GlobalNavigationBar>
	);
};

export default NavigationBar;
