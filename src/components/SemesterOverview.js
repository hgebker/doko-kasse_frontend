import React, { useState } from 'react';

import { SplitView, Spinner } from '@salesforce/design-system-react';
import EveningList from './EveningList';
import SemesterList from './SemesterList';
import AddEveningModal from './AddEveningModal';

const SemesterOverview = () => {
	const [viewOpen, setViewOpen] = useState(true);
	const [evenings, setEvenings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const handleRefresh = () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};

	const handleAddClicked = () => {
		console.log('Add clicked');
		setModalOpen(true);
	};

	const handleModalClose = () => {
		console.log('Modal Closed');
		setModalOpen(false);
	};

	return (
		<div>
			<div className="slds-is-relative" style={{ height: '90vh' }}>
				{loading && <Spinner hasContainer="false" variant="brand" />}

				<SplitView
					events={{
						onClose: () => setViewOpen(false),
						onOpen: () => setViewOpen(true)
					}}
					id="base-example"
					isOpen={viewOpen}
					master={<SemesterList onSemesterChanged={setEvenings} onRefresh={handleRefresh} />}
					detail={<EveningList evenings={evenings} onAddClicked={handleAddClicked} />}
					className="slds-theme_default slds-box slds-box_x-small"
				/>
			</div>

			<AddEveningModal open={modalOpen} onClose={handleModalClose} />
		</div>
	);
};

export default SemesterOverview;
