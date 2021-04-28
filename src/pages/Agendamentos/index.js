import React from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import {
  AddButton,
  Complete,
  Container,
  Heading,
  Remove,
  SearchField,
} from './styles';

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

  function renderStatus(status) {
    return (
      <p style={{ color: status ? 'green' : 'red' }}>
        {status ? 'Concluída' : 'Pendente'}
      </p>
    );
  }

  return (
    <Container>
      <TableContainer component={Paper} style={{ padding: '1em' }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Agendamentos
        </Typography>
        <Heading>
          <div>
            <SearchField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <AddButton component={RouterLink} to={'/agendamento/cadastro'}>
              Novo Agendamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Cliente</b>
              </TableCell>
              <TableCell>
                <b>Dentista</b>
              </TableCell>
              <TableCell>
                <b>Data e Hora</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Ações</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, cliente, dentista, data, hora, concluida }) => (
              <TableRow key={id} hover role="checkbox">
                <TableCell>{cliente}</TableCell>
                <TableCell>{dentista}</TableCell>
                <TableCell>{`${data} - ${hora}h`}</TableCell>
                <TableCell>{renderStatus(concluida)}</TableCell>
                <TableCell>
                  <IconButton>
                    <Complete />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <Remove />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
