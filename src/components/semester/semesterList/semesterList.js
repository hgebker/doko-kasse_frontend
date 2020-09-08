import React, { useState } from 'react';
import { SplitViewHeader, SplitViewListbox, Button, PageHeaderControl, Icon } from '@salesforce/design-system-react';
import { LIST_OPTIONS } from '../semesterConstants';
import './semesterList.css';

const SemesterList = ({ onSemesterChanged, onRefresh }) => {
	const [selected, setSelected] = useState([LIST_OPTIONS[0]]);

	const handleSelect = (_, { selectedItems }) => {
		setSelected(selectedItems);
		onSemesterChanged();
	};

	return [
		<SplitViewHeader
			key="1"
			title="Semesterübersicht"
			truncate
			variant="object-home"
			className="slds-var-p-around_small"
			icon={<Icon assistiveText={{ label: 'Semester' }} category="standard" name="education" />}
			onRenderActions={() => (
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
			)}
		/>,

		<SplitViewListbox
			key="2"
			labels={{ header: 'Semestername' }}
			options={LIST_OPTIONS}
			events={{ onSelect: handleSelect }}
			selection={selected}
		/>
	];
};

export default SemesterList;
