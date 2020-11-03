import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@salesforce/design-system-react/components/modal';
import Button from '@salesforce/design-system-react/components/button';
import Settings from '@salesforce/design-system-react/components/settings';
import AddEveningForm from '../addEveningForm/addEveningForm';
import './addEveningModal.css';

const AddEveningModal = ({ open, onClose, onSave }) => {
  const [item, setItem] = useState({});

  return ReactDOM.createPortal(
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      heading="Abend eintragen"
      dismissOnClickOutside
      contentClassName="modal-content"
      footer={[
        <Button key="1" label="Abbrechen" onClick={onClose} />,
        <Button key="2" label="Speichern" variant="brand" onClick={() => onSave(item)} />
      ]}>
      <AddEveningForm currentItem={item} onItemChanged={setItem} />
    </Modal>,
    document.getElementById('modal')
  );
};

Settings.setAppElement('#root');
export default AddEveningModal;
