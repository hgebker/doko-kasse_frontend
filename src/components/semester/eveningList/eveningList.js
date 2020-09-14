import React from 'react';
import './eveningList.css';
import { Fab } from '@material-ui/core';
import { Icon } from '@salesforce/design-system-react';
import EveningItem from '../eveningItem/eveningItem';

const EveningList = ({ evenings, onAddClicked }) => {
	let items = <div />;

	if (evenings.length) {
		items = evenings.map(item => <EveningItem key={item.Datum} item={item} />);
	}

	return (
		<div className="evening-list">
			{items}

			<Fab onClick={onAddClicked} classes={{ root: 'add-button' }}>
				<Icon category="utility" name="add" />
			</Fab>
		</div>
	);
};

export default EveningList;
