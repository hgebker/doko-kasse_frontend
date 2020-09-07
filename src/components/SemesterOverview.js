import React, { useState } from 'react';

import { SplitView, Spinner } from '@salesforce/design-system-react';
import EveningList from './EveningList';
import SemesterList from './SemesterList';

const SemesterOverview = () => {
	const [open, setOpen] = useState(true);
	const [evenings, setEvenings] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleRefresh = () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};

	return (
		<div className="slds-is-relative" style={{ height: '90vh' }}>
			{loading && <Spinner hasContainer="false" variant="brand" />}

			<SplitView
				events={{
					onClose: () => setOpen(false),
					onOpen: () => setOpen(true)
				}}
				id="base-example"
				isOpen={open}
				master={<SemesterList onSemesterChanged={setEvenings} onRefresh={handleRefresh} />}
				detail={<EveningList evenings={evenings} loading={loading} />}
				className="slds-theme_default slds-box slds-box_x-small"
			/>
		</div>
	);
};

export default SemesterOverview;
