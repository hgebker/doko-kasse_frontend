import { Component, ComponentType, FC, useState } from 'react';
import Spinner from '@salesforce/design-system-react/components/spinner';

const CustomSpinner: FC = () => {
  return <Spinner variant="brand" />;
};

type ShowSpinnerAction = (loading: boolean) => void;

type SpinnerNode = ReturnType<typeof CustomSpinner>;

interface WithSpinner {
  spinner: SpinnerNode;
  setLoading: ShowSpinnerAction;
}

/**
 * Takes a component and adds functionality to show custom alerts
 * @param WrappedComponent Component to be wrapped with this alert functionality
 * @return Another component with the exact same functionality plus alerts
 */
function withSpinner<P>(WrappedComponent: ComponentType<P & WithSpinner>): ComponentType<P> {
  return class WithSpinner extends Component<P, { spinnerNode: SpinnerNode }> {
    state = {
      spinnerNode: null
    };

    setLoading = (loading: boolean) => {
      if (loading) {
        this.setState({ spinnerNode: <CustomSpinner /> });
      } else {
        this.setState({ spinnerNode: null });
      }
    };

    render = () => <WrappedComponent spinner={this.state.spinnerNode} setLoading={this.setLoading} {...this.props} />;
  };
}

function useSpinner(): [SpinnerNode, ShowSpinnerAction] {
  const [spinnerNode, setSpinnerNode] = useState<SpinnerNode>(null);

  const setLoading = (loading: boolean) => {
    if (loading) {
      setSpinnerNode(<CustomSpinner />);
    } else {
      setSpinnerNode(null);
    }
  };

  return [spinnerNode, setLoading];
}

export type { ShowSpinnerAction, SpinnerNode, WithSpinner };
export { withSpinner, useSpinner };
