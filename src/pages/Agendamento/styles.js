import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: 2em 20%;
  padding: 1em;
  @media (max-width: 768px) {
    margin: 1em;
  }
`;

export const SaveButton = styled(Button).attrs(() => ({
  variant: 'contained',
  color: 'primary',
}))`
  background-color: var(--clr-success);

  &:hover,
  focus-visible {
    background-color: var(--clr-success-dark);
  }
`;
