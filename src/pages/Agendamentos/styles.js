import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
export const Container = styled.div`
  margin: 1em;
`;

export const AddButton = styled(Button).attrs(() => ({
  variant: 'contained',
  startIcon: <AddIcon />,
}))`
  margin: 8px;
`;

export const TableContainer = styled(Paper)`
  margin: 2em;
  padding: 1em;
`;
