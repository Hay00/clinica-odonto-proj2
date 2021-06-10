import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: 2em 10%;
  padding: 1em;
  @media (max-width: 768px) {
    margin: 1em;
  }
`;

export const InputContainer = styled.div`
  display: inline-flex;
  margin: 8px;
  max-width: 500px;
`;
