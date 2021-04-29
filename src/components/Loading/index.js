import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  );
}
