import React, { useState } from 'react';

import { SplitViewHeader, SplitViewListbox, Button, PageHeaderControl, Icon } from '@salesforce/design-system-react';
import './semesterList.css';

// TODO: Erweiterte Texte aus den geladenen Daten berechnen
const listOptions = [
	{
		id: 'ws1819',
		label: 'Wintersemester 18/19',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	},
	{
		id: 'ss19',
		label: 'Sommersemester 19',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	},
	{
		id: 'ws1920',
		label: 'Wintersemester 19/20',
		topRightText: '',
		bottomLeftText: '',
		bottomRightText: ''
	},
	{
		id: 'ss20',
		label: 'Sommersemester 20',
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
			title="Semesterübersicht"
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
