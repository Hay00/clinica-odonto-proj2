import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';

export const Container = styled.div`
  margin: 2em 10%;
  @media (max-width: 1024px) {
    margin: 1em;
  }
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 1em 0px;
`;

export const AddButton = styled(Button).attrs(() => ({
  variant: 'contained',
  startIcon: <AddIcon />,
}))`
  margin: 8px;
`;

export const SearchField = styled(TextField).attrs(() => ({
  label: 'Buscar Agendamento',
  variant: 'outlined',
  size: 'small',
  type: 'search',
}))`
  margin: 8px;
`;
