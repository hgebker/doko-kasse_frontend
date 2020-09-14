import React from 'react';
import EveningItem from '../eveningItem/eveningItem';
import { Card } from '@salesforce/design-system-react';

const EveningDetail = ({ evening }) => {
	console.log(evening);
	return (
		<Card className="slds-var-m-left_medium" heading={evening.Datum}>
			<EveningItem playerName="Tim" value={evening.tim} />
			<EveningItem playerName="Jan" value={evening.jan} />
			<EveningItem playerName="Ole" value={evening.ole} />
			<EveningItem playerName="Hannes" value={evening.hannes} />
			<EveningItem playerName="Louisa" value={evening.louisa} />
			<EveningItem playerName="Sonstige" value={evening.sonstige} />
		</Card>
	);
};

export default EveningDetail;
