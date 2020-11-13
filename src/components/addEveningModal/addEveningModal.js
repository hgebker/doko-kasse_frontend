import { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@salesforce/design-system-react/components/modal';
import Button from '@salesforce/design-system-react/components/button';
import Settings from '@salesforce/design-system-react/components/settings';
import AddEveningForm from '../addEveningForm/addEveningForm';
import './addEveningModal.css';

Settings.setAppElement('#root');
export default class AddEveningModal extends Component {
  state = { item: {} };

  render = () =>
    ReactDOM.createPortal(
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.props.onClose}
        heading="Abend eintragen"
        dismissOnClickOutside
        contentClassName="modal-content"
        footer={[
          <Button key="1" label="Abbrechen" onClick={this.props.onClose} />,
          <Button key="2" label="Speichern" variant="brand" onClick={() => this.props.onSave(this.state.item)} />
        ]}>
        <AddEveningForm currentItem={this.state.item} onItemChanged={item => this.setState({ item })} />
      </Modal>,
      document.getElementById('modal')
    );
}
