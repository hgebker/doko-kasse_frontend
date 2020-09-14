import React, { useState, useEffect } from 'react';
import { SplitViewHeader, SplitViewListbox, Button, PageHeaderControl, Icon } from '@salesforce/design-system-react';
import './eveningList.css';

const EveningList = ({ evenings, onEveningSelected, onRefresh }) => {
	const [selected, setSelected] = useState([]);
	useEffect(() => setSelected([evenings[0]]), [evenings]);

	const handleSelect = (_, { selectedItems, item }) => {
		setSelected(selectedItems);
		onEveningSelected(item);
	};

	return [
		<SplitViewHeader
			key="1"
			title="Abendübersicht"
			truncate
			variant="object-home"
			className="slds-var-p-around_small"
			icon={<Icon assistiveText={{ label: 'Abende' }} category="standard" name="education" />}
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
			labels={{ header: 'Datum' }}
			options={evenings}
			events={{ onSelect: handleSelect }}
			selection={selected}
			className="capitalize"
		/>
	];
};

export default EveningList;
