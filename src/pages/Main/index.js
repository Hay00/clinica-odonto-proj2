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
          <a href="/cliente/cadastro">Cadastro Cliente</a>
        </ul>
        <ul>
          <a href="/equipamento/cadastro">Cadastro Equipamento</a>
        </ul>
        <ul>
          <a href="/funcionario/cadastro">Cadastro Funcionário</a>
        </ul>
        <ul>
          <a href="/medicamento/cadastro">Cadastro Medicamento</a>
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
