import React, { useState, useEffect } from 'react';
import { SplitView, Spinner } from '@salesforce/design-system-react';
import { getEntries } from '../dokoAbendeApi';
import EveningList from '../eveningList/eveningList';
import SemesterList from '../semesterList/semesterList';
import AddEveningModal from '../addEveningModal/addEveningModal';

const SemesterOverview = () => {
	const [viewOpen, setViewOpen] = useState(true);
	const [evenings, setEvenings] = useState({ ws1819: [] });
	const [displayedEvenings, setDisplayedEvenings] = useState([]);
	const [selectedSemester, setSelectedSemester] = useState({ id: 'ws1819' });
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const handleRefresh = async () => {
		setLoading(true);

		try {
			setEvenings(await getEntries());
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => setDisplayedEvenings(evenings[selectedSemester.id]), [evenings, selectedSemester]);
	useEffect(() => {
		handleRefresh();
	}, []);

	return (
		<div>
			<div className="slds-is-relative">
				{loading && <Spinner variant="brand" />}

				<SplitView
					className="slds-theme_default slds-box slds-box_x-small"
					isOpen={viewOpen}
					master={<SemesterList onSemesterChanged={setSelectedSemester} onRefresh={handleRefresh} />}
					detail={<EveningList evenings={displayedEvenings} onAddClicked={() => setModalOpen(true)} />}
					events={{
						onClose: () => setViewOpen(false),
						onOpen: () => setViewOpen(true)
					}}
				/>
			</div>

			<AddEveningModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</div>
	);
};

export default SemesterOverview;
