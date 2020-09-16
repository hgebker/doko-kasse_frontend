import React, { useState } from 'react';
import { Modal, Button, Settings } from '@salesforce/design-system-react';
import AddEveningForm from '../addEveningForm/addEveningForm';
import './addEveningModal.css';

const AddEveningModal = ({ open, onClose, onSave }) => {
	const [item, setItem] = useState({});

	return (
		<Modal
			isOpen={open}
			onRequestClose={onClose}
			heading="Abend eintragen"
			dismissOnClickOutside
			contentClassName="modal-content"
			footer={[
				<Button key="1" label="Abbrechen" onClick={onClose} />,
				<Button key="2" label="Speichern" variant="brand" onClick={() => onSave(item)} />
			]}
		>
			<AddEveningForm currentItem={item} onItemChanged={setItem} />
		</Modal>
	);
};

Settings.setAppElement('#root');
export default AddEveningModal;
