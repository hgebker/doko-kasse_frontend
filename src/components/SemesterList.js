import React, { useState } from 'react';

import { SplitViewHeader, SplitViewListbox, Button, PageHeaderControl, Icon } from '@salesforce/design-system-react';
import './SemesterList.css';

const listOptions = [
	{
		id: 'ws1819',
		label: 'WS 18/19',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	},
	{
		id: 'ss19',
		label: 'SS 19',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	},
	{
		id: 'ws1920',
		label: 'WS 19/20',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	},
	{
		id: 'ss20',
		label: 'SS 20',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	}
];

const headerActions = onRefresh => (
	<React.Fragment>
		<PageHeaderControl>
			<Button
				assistiveText={{ icon: 'Refresh' }}
				iconCategory="utility"
				iconName="refresh"
				iconVariant="border"
				variant="icon"
				className="refresh-button"
				onClick={onRefresh}
			/>
		</PageHeaderControl>
	</React.Fragment>
);

const SemesterList = ({ onRefresh }) => {
	const [selected, setSelected] = useState([listOptions[0]]);

	return [
		<SplitViewHeader
			key="1"
			onRenderActions={() => headerActions(onRefresh)}
			icon={<Icon assistiveText={{ label: 'Semester' }} category="standard" name="education" />}
			title="Semester"
			truncate
			variant="object-home"
			className="slds-var-p-around_small"
		/>,
		<SplitViewListbox
			key="2"
			labels={{
				header: 'Semestername'
			}}
			options={listOptions}
			events={{
				onSelect: (_, { selectedItems }) => setSelected(selectedItems)
			}}
			selection={selected}
		/>
	];
};

export default SemesterList;
