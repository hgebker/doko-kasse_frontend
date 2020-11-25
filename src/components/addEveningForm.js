import { Component } from 'react';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Input from '@salesforce/design-system-react/components/input';
import DatePicker from '@salesforce/design-system-react/components/date-picker';
import { LIST_OPTIONS } from '../constants/semester';
import { PLAYERS } from '../constants/player';
import moment from 'moment';

const parseDateString = dateString => moment(dateString, 'YYYY-MM-DD').toDate();

const formatDate = date => (date ? moment(date).format('YYYY-MM-DD') : '');

export default class AddEveningForm extends Component {
  state = {
    item: {
      Datum: moment(Date.now()).format('YYYY-MM-DD'),
      semester: LIST_OPTIONS[LIST_OPTIONS.length - 1].id,
      tim: 0,
      jan: 0,
      ole: 0,
      hannes: 0,
      louisa: 0,
      sonstige: 0
    },
    semesterLabel: LIST_OPTIONS[LIST_OPTIONS.length - 1].label
  };

  get item() {
    return this.state.item;
  }

  addValueToItem = (key, value) => {
    this.setState(state => ({ item: { ...state.item, [key]: value } }));
  };

  addOrUpdateValue = (event, { value }) => {
    this.addValueToItem(event.target.id, +value);
  };

  handleDatepickerSelect = (_, { formattedDate }) => {
    this.addValueToItem('Datum', formattedDate);
  };

  handleComboboxSelect = (_, { selection }) => {
    const [selectedItem] = selection;
    this.addValueToItem('semester', selectedItem.id);
    this.setState({ semesterLabel: selectedItem.label });
  };

  render = () => (
    <section className="slds-var-p-around_small slds-grid slds-grid_pull-padded slds-wrap">
      <div className="slds-col slds-col_padded slds-size_1-of-1 slds-large-size_1-of-2 slds-form-element slds-var-m-bottom_small">
        <Combobox
          labels={{ label: 'Semester', placeholder: 'Semester auswählen' }}
          options={LIST_OPTIONS}
          required
          value={this.state.semesterLabel}
          events={{ onSelect: this.handleComboboxSelect }}
          id="semester"
        />
      </div>

      <div className="slds-col slds-col_padded slds-size_1-of-1 slds-large-size_1-of-2 slds-form-element slds-var-m-bottom_small">
        <DatePicker
          labels={{ label: 'Datum', placeholder: 'Datum auswählen' }}
          formatter={formatDate}
          parser={parseDateString}
          triggerClassName="slds-size_full"
          align="right"
          isIsoWeekday
          hasStaticAlignment
          required
          onChange={this.handleDatepickerSelect}
          id="Datum"
          value={parseDateString(this.state.item.Datum)}
        />
      </div>

      {PLAYERS.map(player => (
        <div
          key={player}
          className="slds-col slds-col_padded slds-size_1-of-2 slds-form-element slds-var-m-bottom_small">
          <Input
            id={player}
            label={player}
            value={this.state.item[player]}
            type="number"
            fixedTextLeft="€"
            step={0.1}
            required
            onChange={this.addOrUpdateValue}
            className="input-field"
          />
        </div>
      ))}
    </section>
  );
}
