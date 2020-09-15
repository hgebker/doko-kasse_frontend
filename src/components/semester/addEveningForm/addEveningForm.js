import React from 'react';
import { LIST_OPTIONS } from '../semesterConstants';
import { Combobox, Input } from '@salesforce/design-system-react';

const AddEveningForm = ({ onItemChanged }) => (
	<section className="slds-var-p-around_small">
		<div className="slds-form-element slds-var-m-bottom_small">
			<Combobox labels={{ label: 'Semester', placeholder: 'Semester auswählen' }} options={LIST_OPTIONS} required />
		</div>
		<div className="slds-form-element slds-var-m-bottom_small">
			<Input label="Tim" type="number" />
		</div>
		<div className="slds-form-element slds-var-m-bottom_small">
			<Input label="Jan" type="number" />
		</div>
		<div className="slds-form-element slds-var-m-bottom_small">
			<Input label="Ole" type="number" />
		</div>
		<div className="slds-form-element slds-var-m-bottom_small">
			<Input label="Hannes" type="number" />
		</div>
		<div className="slds-form-element slds-var-m-bottom_small">
			<Input label="Louisa" type="number" />
		</div>
		<div className="slds-form-element slds-var-m-bottom_small">
			<Input label="Sonstige" type="number" />
		</div>
	</section>
);

export default AddEveningForm;
