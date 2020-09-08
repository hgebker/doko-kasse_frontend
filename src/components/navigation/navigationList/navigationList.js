import React from 'react';
import { VerticalNavigation } from '@salesforce/design-system-react';
import { NAV_ITEMS } from '../navConstants';
import './navigationList.css';

const navCategories = [
	{
		id: 'default',
		label: 'Navigation',
		items: NAV_ITEMS
	}
];

const NavigationList = ({ visible, activeContent, onActiveTabChange, onClose }) => {
	const classes = `slds-theme_default vertical-navigation ${visible ? 'open' : 'closed'}`;

	const handleSelect = (_, { item }) => {
		onActiveTabChange(item.id);
		onClose(false);
	};

	return (
		<VerticalNavigation
			categories={navCategories}
			selectedId={activeContent}
			onSelect={handleSelect}
			className={classes}
		/>
	);
};

export default NavigationList;
