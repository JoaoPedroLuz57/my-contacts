import PropTypes from 'prop-types';

import { Container } from './styles';

export function FormGroup({ children }) {
  return <Container>{children}</Container>;
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
