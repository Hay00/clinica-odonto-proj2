import { InputBase, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled(Paper)`
  display: flex;
  align-items: center;
  margin: 8px;
  padding: 2px 4px;
  width: 460px;
`;

export const Input = styled(InputBase)`
  margin-left: 8px;
  flex: 1;
`;
