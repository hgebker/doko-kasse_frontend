import { Component, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from '@material-ui/core/styles/styled';

const Spinner = styled(CircularProgress)({
  position: 'absolute',
  left: '50%',
  top: '50%'
});
const Container = styled('div')({
  position: 'absolute',
  inset: '0 0 0 0',
  backgroundColor: 'hsla(0,0%,100%,.75)',
  opacity: 1,
  zIndex: 9999
});

const buildSpinner = () => (
  <Container>
    <Spinner />
  </Container>
);

/**
 * Takes a component and adds functionality to show custom alerts
 * @param WrappedComponent Component to be wrapped with this alert functionality
 * @return Another component with the exact same functionality plus alerts
 */
function withSpinner(WrappedComponent) {
  return class WithSpinner extends Component {
    state = {
      loading: false
    };

    setLoading = loading => {
      this.setState({ loading });
    };

    render = () => (
      <>
        {this.state.loading && buildSpinner()}
        <WrappedComponent setLoading={this.setLoading} {...this.props} />
      </>
    );
  };
}

function useSpinner() {
  const [loading, setLoading] = useState(false);

  return [loading ? buildSpinner() : null, setLoading];
}

export { withSpinner, useSpinner };
