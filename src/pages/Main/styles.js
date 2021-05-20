import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export const Container = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
  margin: 2em 5%;
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
