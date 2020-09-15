import React, { useState } from 'react';
import { Modal, Button, Settings } from '@salesforce/design-system-react';
import AddEveningForm from '../addEveningForm/addEveningForm';

const AddEveningModal = ({ open, onClose, onSave }) => {
	const [item, setItem] = useState({});

	return (
		<Modal
			isOpen={open}
			onRequestClose={onClose}
			heading="Abend eintragen"
			dismissOnClickOutside
			footer={[
				<Button key="1" label="Abbrechen" onClick={onClose} />,
				<Button key="2" label="Speichern" variant="brand" onClick={() => onSave(item)} />
			]}
		>
			<AddEveningForm onItemChanged={setItem} />
		</Modal>
	);
};

Settings.setAppElement('#root');
export default AddEveningModal;
