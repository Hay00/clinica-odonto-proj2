import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

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

export const Message = styled.p`
  display: flex;
  color: gray;
  margin: 60px auto;
  font-size: 18px;
  justify-content: center;
`;

export const Complete = styled(DoneIcon)`
  color: var(--clr-success);
`;

export const Remove = styled(DeleteIcon)`
  color: var(--clr-error);
`;