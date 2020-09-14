import React, { useState, useEffect } from 'react';
import { SplitView, Spinner, Icon } from '@salesforce/design-system-react';
import { getEntries } from '../dokoAbendeApi';
import EveningList from '../eveningList/eveningList';
import EveningDetail from '../eveningDetail/eveningDetail';
import AddEveningModal from '../addEveningModal/addEveningModal';
import { Fab } from '@material-ui/core';

const SemesterOverview = () => {
	const [viewOpen, setViewOpen] = useState(true);
	const [evenings, setEvenings] = useState([]);
	const [selectedEvening, setSelectedEvening] = useState(null);
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

	useEffect(() => {
		// const selectedEvening = evenings.find(ev => ev.Datum === selectedEvening.Datum);
		// setDisplayedEvenings();
	}, [evenings, selectedEvening]);
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
					master={
						evenings && (
							<EveningList evenings={evenings} onEveningSelected={setSelectedEvening} onRefresh={handleRefresh} />
						)
					}
					detail={selectedEvening ? <EveningDetail evening={selectedEvening.data} /> : <div></div>}
					events={{
						onClose: () => setViewOpen(false),
						onOpen: () => setViewOpen(true)
					}}
				/>
			</div>

			<Fab onClick={() => setModalOpen(true)} classes={{ root: 'add-button' }}>
				<Icon category="utility" name="add" />
			</Fab>

			<AddEveningModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</div>
	);
};

export default SemesterOverview;
