import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { AddButton, Container, TableContainer } from './styles';
import { Typography } from '@material-ui/core';

export default function Agendamentos() {
  const rows = [
    {
      id: 0,
      cliente: '1 cliente',
      dentista: '1 dentista',
      data: new Date().toLocaleDateString('pt-br'),
      hora: new Date().getHours(),
      concluida: false,
    },
    {
      id: 1,
      cliente: '2 cliente',
      dentista: '2 dentista',
      data: new Date().toLocaleDateString('pt-br'),
      hora: new Date().getHours(),
      concluida: false,
    },
    {
      id: 2,
      cliente: '3 cliente',
      dentista: '3 dentista',
      data: new Date().toLocaleDateString('pt-br'),
      hora: new Date().getHours(),
      concluida: true,
    },
    {
      id: 3,
      cliente: '4 cliente',
      dentista: '4 dentista',
      data: new Date().toLocaleDateString('pt-br'),
      hora: new Date().getHours(),
      concluida: false,
    },
    {
      id: 4,
      cliente: '5 cliente',
      dentista: '5 dentista',
      data: new Date().toLocaleDateString('pt-br'),
      hora: new Date().getHours(),
      concluida: true,
    },
  ];

  function renderConcluida(status) {
    return (
      <p style={{ color: status ? 'green' : 'red' }}>
        {status ? 'Sim' : 'Pendente'}
      </p>
    );
  }

  return (
    <Container>
      <AddButton>Novo agendamento</AddButton>
      <TableContainer>
        <Typography color="primary" variant="h6">
          Agendamentos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Dentista</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Concluída</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, cliente, dentista, data, hora, concluida }) => (
              <TableRow key={id} hover role="checkbox">
                <TableCell>{cliente}</TableCell>
                <TableCell>{dentista}</TableCell>
                <TableCell>{data}</TableCell>
                <TableCell>{hora}</TableCell>
                <TableCell>{renderConcluida(concluida)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
