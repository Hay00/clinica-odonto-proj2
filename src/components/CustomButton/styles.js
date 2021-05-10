import styled from 'styled-components';

import Button from '@material-ui/core/Button';

export const StyledButton = styled(({ color, ...otherProps }) => (
  <Button {...otherProps} />
))`
  background-color: var(--clr-${({ color }) => color});
  color: #fff;
  && {
    border-right: none;
  }
  &&:hover {
    background-color: var(--clr-${({ color }) => color});
    opacity: 0.8;
  }
`;
