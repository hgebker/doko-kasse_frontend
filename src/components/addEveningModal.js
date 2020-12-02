import { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from '@salesforce/design-system-react/components/modal';
import Button from '@salesforce/design-system-react/components/button';
import Settings from '@salesforce/design-system-react/components/settings';
import withStyles from '@material-ui/styles/withStyles';
import AddEveningForm from './addEveningForm';

const styles = {
  modalContent: {
    overflow: 'visible',
    maxHeight: '80vh'
  },
  '@media screen and (max-width: 500px)': {
    modalContent: {
      maxHeight: '50vh'
    }
  }
};

Settings.setAppElement('#root');

class AddEveningModal extends Component {
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
        contentClassName={this.props.classes.modalContent}
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

export default withStyles(styles)(AddEveningModal);
