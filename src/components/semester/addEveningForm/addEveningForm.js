import React, { useState } from 'react';
import moment from 'moment';
import { LIST_OPTIONS } from '../semesterConstants';
import { Combobox, Input, DatePicker } from '@salesforce/design-system-react';

const PLAYER = ['tim', 'jan', 'ole', 'hannes', 'louisa', 'sonstige'];

const AddEveningForm = ({ currentItem, onItemChanged }) => {
	const [value, setValue] = useState('');

	const addOrUpdateValue = (event, { value }) => onItemChanged({ ...currentItem, [event.target.id]: value });
	const handleDatepickerSelect = (_, { formattedDate }) => onItemChanged({ ...currentItem, Datum: formattedDate });
	const handleComboboxSelect = (_, { selection }) => {
		setValue(selection[0].label);
		onItemChanged({ ...currentItem, semester: selection[0].id });
	};

	return (
		<section className="slds-var-p-around_small slds-grid slds-grid_pull-padded slds-wrap">
			<div className="slds-col slds-col_padded slds-size_1-of-2 slds-form-element slds-var-m-bottom_small">
				<Combobox
					labels={{ label: 'Semester', placeholder: 'Semester auswählen' }}
					options={LIST_OPTIONS}
					required
					value={value}
					events={{ onSelect: handleComboboxSelect }}
					id="semester"
				/>
			</div>
			<div className="slds-col slds-col_padded slds-size_1-of-2 slds-form-element slds-var-m-bottom_small">
				<DatePicker
					labels={{ label: 'Datum', placeholder: 'Datum auswählen' }}
					formatter={date => (date ? moment(date).format('YYYY-MM-DD') : '')}
					parser={dateString => moment(dateString, 'YYYY-MM-DD').toDate()}
					triggerClassName="slds-size_full"
					isIsoWeekday
					required
					onChange={handleDatepickerSelect}
					id="Datum"
				/>
			</div>
			{PLAYER.map(player => (
				<div
					key={player}
					className="slds-col slds-col_padded slds-size_1-of-2 slds-form-element slds-var-m-bottom_small"
				>
					<Input id={player} label={player} type="number" fixedTextLeft="€" required onChange={addOrUpdateValue} />
				</div>
			))}
		</section>
	);
};

export default AddEveningForm;
