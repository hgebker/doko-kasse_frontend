/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ComponentType, FC, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '@salesforce/design-system-react/components/toast';
import ToastContainer from '@salesforce/design-system-react/components/toast/container';

type ToastVariant = 'error' | 'success' | 'warning';

interface CustomToastProps {
  title: string;
  message: string;
  variant: ToastVariant;
  handleClose: () => void;
}

const CustomToast: FC<CustomToastProps> = ({ title, message, variant, handleClose }) => {
  const labels = {
    heading: [title],
    details: [message]
  };

  return createPortal(
    <Toast labels={labels} variant={variant || 'error'} duration={5000} onRequestClose={handleClose} />,
    document.getElementById('toasts') || document.body
  );
};

type ToastNode = ReturnType<typeof CustomToast>;

type ShowToastAction = (title: string, message: string, variant: ToastVariant) => void;

interface WithToasts {
  toast: ToastNode;
  showToast: ShowToastAction;
}

/**
 * Takes a component and adds functionality to show custom alerts
 * @param WrappedComponent Component to be wrapped with this alert functionality
 * @return Another component with the exact same functionality plus alerts
 */
function withToasts<P>(WrappedComponent: ComponentType<P & WithToasts>): ComponentType<P> {
  return class WithToasts extends Component<P, { toastNode: ToastNode }> {
    state = {
      toastNode: null
    };

    showToast: ShowToastAction = (title, message, variant) => {
      this.setState({
        toastNode: <CustomToast title={title} message={message} variant={variant} handleClose={this.handleClose} />
      });
    };

    handleClose = () => {
      this.setState({ toastNode: null });
    };

    render = () => <WrappedComponent toast={this.state.toastNode} showToast={this.showToast} {...this.props} />;
  };
}

function useToasts(): [ToastNode, ShowToastAction] {
  const [toastNode, setToastNode] = useState<ToastNode>(null);

  const showToast: ShowToastAction = (title, message, variant) => {
    setToastNode(<CustomToast title={title} message={message} variant={variant} handleClose={handleClose} />);
  };

  const handleClose = () => {
    setToastNode(null);
  };

  return [toastNode, showToast];
}

export { withToasts, useToasts };
