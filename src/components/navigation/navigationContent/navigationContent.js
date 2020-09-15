import React from 'react';
import SemesterOverview from '../../semester/semesterOverview/semesterOverview';

const NavigationContent = ({ activeContent }) => {
	let node;

	switch (activeContent) {
		case 'item-1':
			node = <SemesterOverview />;
			break;

		case 'item-2':
			node = <div></div>;
			break;

		default:
			node = <h1 className="slds-text-color_error">Error</h1>;
			break;
	}

	return <div className="slds-var-p-around_small">{node}</div>;
};

export default NavigationContent;
