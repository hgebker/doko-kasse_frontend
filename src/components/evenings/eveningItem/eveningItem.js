import React from 'react';
import { Avatar } from '@salesforce/design-system-react';

const EveningItem = ({ playerName, avatar, value }) => (
	<article className="slds-tile slds-media slds-var-m-around_small slds-box">
		<div className="slds-media__figure">
			<Avatar imgSrc={avatar} imgAlt={playerName} title={playerName} />
		</div>

		<div className="slds-media__body">
			<h1 className="slds-label slds-text-title_caps" title={playerName}>
				{playerName}
			</h1>

			<div className="slds-tile__detail">
				<dl className="slds-list_horizontal slds-wrap">
					<dt className="slds-item_label slds-text-color_weak slds-truncate" title="Betrag">
						Betrag:
					</dt>
					<dd className="slds-item_detail slds-truncate" title={value}>
						{value}
					</dd>
				</dl>
			</div>
		</div>
	</article>
);

export default EveningItem;
