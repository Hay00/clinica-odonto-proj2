import React from 'react';
import { Container } from './styles';

export default function index() {
  return (
    <Container>
      <ul>
        <ul>
          <a href="/">Main</a>
        </ul>
        <ul>
          <a href="/agendamento">Agendamentos</a>
        </ul>
        <ul>
          <a href="/atendimento">Atendimento</a>
        </ul>
        <ul>
          <a href="/cadastro">Cadastro</a>
        </ul>
        <ul>
          <a href="/compras">Compras</a>
        </ul>
        <ul>
          <a href="/financeiro">Financeiro</a>
        </ul>
        <ul>
          <a href="/login">Login</a>
        </ul>
        <ul>
          <a href="/pagamento">Pagamento</a>
        </ul>
        <ul>
          <a href="/relatorios">Relatorios</a>
        </ul>
        <ul>
          <a href="/venda">Venda</a>
        </ul>
      </ul>
    </Container>
  );
}
