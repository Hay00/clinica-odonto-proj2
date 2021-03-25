import { Button } from '@material-ui/core';
import React from 'react';

import { Container } from './styles';

export default function Financeiro() {
  return (
    <Container>
      <div className={'container'}>
        <h1>Simple SPA</h1>
        <ul className="header">
          <li>
            <a href="/">Home</a>
            <Button>UM BOTÃO</Button>
          </li>
          <li>
            <a href="/stuff">Stuff</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="content"></div>
      </div>
    </Container>
  );
}
