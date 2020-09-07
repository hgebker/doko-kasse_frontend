import React from 'react';

const EveningList = ({ evenings }) => {
	let items;

	if (!evenings.length) {
		items = <div />;
	}

	items = evenings.map(item => (
		<dl key={item.id} className="slds-box slds-m-left_medium slds-m-bottom_medium slds-list_horizontal slds-wrap">
			<dt className="slds-item_label slds-text-color_weak slds-truncate" title="Name">
				Name:
			</dt>
			<dd className="slds-item_detail slds-truncate" title={item.label}>
				{item.label}
			</dd>
			<dt className="slds-item_label slds-text-color_weak slds-truncate" title="Value">
				Value:
			</dt>
			<dd className="slds-item_detail slds-truncate" title={item.topRightText}>
				{item.topRightText}
			</dd>
			<dt className="slds-item_label slds-text-color_weak slds-truncate" title="Company">
				Company:
			</dt>
			<dd className="slds-item_detail slds-truncate" title={item.bottomLeftText}>
				{item.bottomLeftText}
			</dd>
			<dt className="slds-item_label slds-text-color_weak slds-truncate" title="Status">
				Status:
			</dt>
			<dd className="slds-item_detail slds-truncate" title={item.bottomRightText}>
				{item.bottomRightText}
			</dd>
		</dl>
	));

	return <div>{items}</div>;
};

export default EveningList;
