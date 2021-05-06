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

import { AddButton, Container, Heading, Remove, SearchField } from './styles';

export default function ListFinanceiro() {
  const rows = [
    {
      id: 0,
      data: new Date().toLocaleDateString('pt-br'),
      descricao: 'Cirurgia Dentaria',
      situacao: true,
      valor: '505.90',
      envolvido: 'Fulano',
    },
    {
      id: 1,
      data: new Date().toLocaleDateString('pt-br'),
      descricao: 'Reparo Aparelho',
      situacao: true,
      valor: '505.90',
      envolvido: 'Ciclano',
    },

    {
      id: 2,
      data: new Date().toLocaleDateString('pt-br'),
      descricao: 'Reparo Aparelho',
      situacao: true,
      valor: '505.90',
      envolvido: 'Beltrano',
    },
    {
      id: 3,
      data: new Date().toLocaleDateString('pt-br'),
      descricao: 'Reparo Aparelho',
      situacao: false,
      valor: -505.9,
      envolvido: 'Antonio',
    },
    {
      id: 4,
      data: new Date().toLocaleDateString('pt-br'),
      descricao: 'Reparo Aparelho',
      situacao: true,
      valor: 505.9,
      envolvido: 'Roberto',
    },
  ];

  function renderSituacao(situacao) {
    return (
      <p style={{ color: situacao ? 'green' : 'red' }}>
        {situacao ? 'Pago' : 'Não Pago'}
      </p>
    );
  }

  function renderValor(valor) {
    return <p style={{ color: valor > 0 ? 'green' : 'red' }}>{valor}</p>;
  }

  return (
    <Container>
      <TableContainer component={Paper} style={{ padding: '1em' }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Financeiro
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
            <AddButton component={RouterLink} to={'/Financeiro/cadastro'}>
              Novo lançamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID da Transação</b>
              </TableCell>
              <TableCell>
                <b>Data</b>
              </TableCell>
              <TableCell>
                <b>Descrição</b>
              </TableCell>
              <TableCell>
                <b>Situação</b>
              </TableCell>
              <TableCell>
                <b>valor</b>
              </TableCell>
              <TableCell>
                <b>Cliente/Fornecedor</b>
              </TableCell>
              <TableCell>
                <b>Ações</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, data, descricao, situacao, valor, envolvido }) => (
              <TableRow key={id} hover role="checkbox">
                <TableCell>{id}</TableCell>
                <TableCell>{data}</TableCell>
                <TableCell>{descricao}</TableCell>
                <TableCell>{renderSituacao(situacao)}</TableCell>
                <TableCell>{renderValor(valor)}</TableCell>
                <TableCell>{envolvido}</TableCell>
                <TableCell>
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
