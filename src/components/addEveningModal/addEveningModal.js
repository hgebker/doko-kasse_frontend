import React from 'react';
import { Modal, Button, Settings } from '@salesforce/design-system-react';
Settings.setAppElement('#root');

const AddEveningModal = ({ open, onClose }) => {
	const saveEvening = () => {
		// TODO: POST an AWS
		onClose();
	};

	return (
		<Modal
			isOpen={open}
			footer={[
				<Button key="1" label="Abbrechen" onClick={onClose} />,
				<Button key="2" label="Speichern" variant="brand" onClick={saveEvening} />
			]}
			onRequestClose={onClose}
			heading="Abend eintragen"
			dismissOnClickOutside
		>
			<section className="slds-p-around_large">
				<div className="slds-form-element slds-m-bottom_large">
					{/* <label className="slds-form-element__label" htmlFor="opptyName">
						Opportunity Name
					</label>
					<div className="slds-form-element__control">
						<input id="opptyName" className="slds-input" type="text" placeholder="Enter name" />
					</div> */}
				</div>
				<div className="slds-form-element slds-m-bottom_large"></div>
				<div className="slds-form-element slds-m-bottom_large"></div>
				<div className="slds-form-element slds-m-bottom_large"></div>
				<div className="slds-form-element slds-m-bottom_large"></div>
				<div className="slds-form-element slds-m-bottom_large"></div>
			</section>
		</Modal>
	);
};

export default AddEveningModal;
