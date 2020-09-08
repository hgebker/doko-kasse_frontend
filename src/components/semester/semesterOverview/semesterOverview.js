import React, { useState } from 'react';
import { SplitView, Spinner } from '@salesforce/design-system-react';
import EveningList from '../eveningList/eveningList';
import SemesterList from '../semesterList/semesterList';
import AddEveningModal from '../addEveningModal/addEveningModal';

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

	const handleSemesterChanged = () => {
		setEvenings([]);
	};

	return (
		<div>
			<div className="slds-is-relative">
				{loading && <Spinner hasContainer="false" variant="brand" />}

				<SplitView
					className="slds-theme_default slds-box slds-box_x-small"
					isOpen={viewOpen}
					master={<SemesterList onSemesterChanged={handleSemesterChanged} onRefresh={handleRefresh} />}
					detail={<EveningList evenings={evenings} onAddClicked={handleAddClicked} />}
					events={{
						onClose: () => setViewOpen(false),
						onOpen: () => setViewOpen(true)
					}}
				/>
			</div>

			<AddEveningModal open={modalOpen} onClose={handleModalClose} />
		</div>
	);
};

export default SemesterOverview;
