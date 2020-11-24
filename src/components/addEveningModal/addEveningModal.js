import { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@salesforce/design-system-react/components/modal';
import Button from '@salesforce/design-system-react/components/button';
import Settings from '@salesforce/design-system-react/components/settings';
import AddEveningForm from '../addEveningForm/addEveningForm';
import './addEveningModal.css';

Settings.setAppElement('#root');
export default class AddEveningModal extends Component {
  formRef = createRef();

  handleCancelClicked = () => {
    this.props.onClose();
  };

  handleSaveClicked = () => {
    this.props.onSave(this.formRef.current.item);
  };

  render = () =>
    ReactDOM.createPortal(
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.props.onClose}
        heading="Abend eintragen"
        dismissOnClickOutside
        contentClassName="modal-content"
        footer={
          <>
            <Button label="Abbrechen" onClick={this.handleCancelClicked} />
            <Button label="Speichern" variant="brand" onClick={this.handleSaveClicked} />
          </>
        }>
        <AddEveningForm ref={this.formRef} />
      </Modal>,
      document.getElementById('modal')
    );
}
