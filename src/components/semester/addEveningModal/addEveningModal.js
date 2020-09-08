import React from 'react';
import { Modal, Button, Settings } from '@salesforce/design-system-react';
import AddEveningForm from '../addEveningForm/addEveningForm';

const AddEveningModal = ({ open, onClose }) => {
	const saveEvening = () => {
		// TODO: POST an AWS
		onClose();
	};

	return (
		<Modal
			isOpen={open}
			onRequestClose={onClose}
			heading="Abend eintragen"
			dismissOnClickOutside
			footer={[
				<Button key="1" label="Abbrechen" onClick={onClose} />,
				<Button key="2" label="Speichern" variant="brand" onClick={saveEvening} />
			]}
		>
			<AddEveningForm />
		</Modal>
	);
};

Settings.setAppElement('#root');
export default AddEveningModal;
