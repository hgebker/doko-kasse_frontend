/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ComponentType, ReactNode } from 'react';
import ReactModal from 'react-modal';
import Modal from '@salesforce/design-system-react/components/modal';
import Button from '@salesforce/design-system-react/components/button';
import { makeStyles } from '@material-ui/styles';

ReactModal.setAppElement('#root');

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

const DEFAULT_BUTTON_DEFINITIONS: Record<DefaultButtonName, ModalButton> = {
  SAVE: {
    label: 'Speichern',
    variant: 'brand'
  },
  CANCEL: {
    label: 'Abbrechen',
    variant: 'neutral'
  },
  DELETE: {
    label: 'Löschen',
    variant: 'destructive'
  }
};

function buildModal<C>(config: ModalConfig<C>, closeModal: () => void, className: string) {
  const { heading, child, buttons = [], defaultButtons, defaultActions, onClose } = config;

  const selectedDefaultDefs = (defaultButtons ?? [])?.map(key => {
    return {
      ...DEFAULT_BUTTON_DEFINITIONS[key],
      action: defaultActions?.[key]
    };
  });
  const allButtons = [...buttons, ...selectedDefaultDefs];

  let childState = {};

  const updateChildState = (newState: Record<string, unknown>) => {
    childState = newState;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    closeModal();
  };

  const renderChild = () => {
    if (!child) {
      return null;
    }

    const { type: Child, props } = child;

    return <Child {...props} onStateUpdate={updateChildState} />;
  };

  return (
    <Modal
      isOpen
      heading={heading}
      onRequestClose={handleClose}
      // contentClassName={classes.modalContent}
      contentClassName={className}
      footer={
        <>
          {allButtons.map(button => (
            <Button
              key={button.label}
              label={button.label}
              onClick={() => {
                button.action?.(childState);
                handleClose();
              }}
              disabled={button.disabled?.()}
              variant={button.variant}
            />
          ))}
        </>
      }>
      {renderChild()}
    </Modal>
  );
}

type ModalButtonAction = (result: Record<string, unknown>) => void;

interface ModalButton {
  label: string;
  variant: 'brand' | 'destructive' | 'base' | 'neutral';
  disabled?: () => boolean;
  action?: ModalButtonAction;
}

interface ModalContentProps {
  onStateUpdate?: (newState: Record<string, unknown>) => void;
}

interface ModalChild<C> {
  type: ComponentType<C & ModalContentProps>;
  props: C;
}

type ModalChildProps = {
  [x: string]: any;
};

type DefaultButtonName = 'SAVE' | 'CANCEL' | 'DELETE';

interface ModalConfig<C> {
  heading: string;
  child?: ModalChild<C>;
  buttons?: ModalButton[];
  defaultButtons?: DefaultButtonName[];
  defaultActions: {
    [P in DefaultButtonName]?: ModalButtonAction;
  };
  onClose?: () => void;
}

type OpenModalAction = <C extends ModalChildProps>(config: ModalConfig<C>) => void;

/* type State = {
  modal: ReactNode | null;
}; */
type WithModalProps = {
  openModal: OpenModalAction;
};

/**
 * Takes a component and adds functionality to easily show different modals
 * @param WrappedComponent Component to be wrapped with the modal functionality
 * @return Another component with the exact same functionality plus modal
 */
/* function withModal<P>(WrappedComponent: ComponentType<P & WithModalProps>): ComponentType<P> {
  class WithModal extends Component<P & WithStyles<typeof styles>, State> {
    state = {
      modal: null
    };

    openModal = <C extends Record<string, any>>(config: ModalConfig<C>) => {
      this.setState({ modal: buildModal(config, this.closeModal, this.props.classes.modalContent) });
    };

    closeModal = (): void => {
      this.setState({ modal: null });
    };

    render = (): ReactNode => (
      <>
        {this.state.modal}
        <WrappedComponent openModal={this.openModal} {...this.props} />
      </>
    );
  }

  return withStyles(styles)(WithModal) as ComponentType<P>;
} */

function useModal(): [ReactNode, OpenModalAction] {
  const classes = makeStyles(styles)();
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModal = <C extends Record<string, any>>(config: ModalConfig<C>) => {
    setModal(buildModal(config, closeModal, classes.modalContent));
  };

  const closeModal = (): void => {
    setModal(null);
  };

  return [modal, openModal];
}

function createDefaultModalConfig<C extends ModalChildProps>(child?: ModalChild<C>): ModalConfig<C> {
  return {
    heading: 'Modal Container',
    child,
    defaultButtons: ['SAVE', 'CANCEL'],
    defaultActions: {}
  };
}

export { useModal, createDefaultModalConfig };
export type { WithModalProps, ModalContentProps, ModalConfig };
