import React, { useEffect, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import { Container, Message, Heading, AddButton } from './styles';

// Api back-end
import api from '../../services/api';

// Componentes
import Loading from '../../components/Loading';
import DateTransformer from '../../utils/dateTransformer';

export default function Main() {
  const [agendamentos, setAgendamentos] = useState([]);
  // const [pendencias, setPendencias] = useState([]);

  /**
   * Busca os agendamentos usando a API
   */
  useEffect(() => {
    api
      .get('/agendamentos')
      .then(({ data }) => {
        if (data.values.length) {
          setAgendamentos(data.values);
        } else {
          setAgendamentos(null);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  /**
   * Realiza a formatação da data em SQL para JS
   *
   * @param {Date} date data
   * @param {String} hora hora
   * @returns JSX
   */
  function parseDate(date, hora) {
    date = new Date(date).toLocaleDateString('pt-br');
    return `${date} - ${hora}`;
  }

  /**
   * Renderiza o status do agendamento
   *
   * @param {Boolean} status status do agendamento
   * @returns JSX
   */
  function renderStatus(status) {
    return (
      <p style={{ color: status ? 'green' : 'red' }}>
        {status ? 'Concluída' : 'Pendente'}
      </p>
    );
  }

  /**
   * Renderiza a tabela de acordo com os dados
   *
   * @returns SJX
   */
  function renderTable() {
    if (agendamentos === null) {
      return <Message>Nenhum agendamento encontrado!</Message>;
    }
    if (agendamentos.length) {
      return (
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
                <b>Tipo</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((obj) => (
              <TableRow key={obj.idAgenda} hover role="checkbox">
                <TableCell>{obj.cliente}</TableCell>
                <TableCell>{obj.dentista}</TableCell>
                <TableCell>
                  {DateTransformer.toBrl(obj.data)} - {obj.hora}
                </TableCell>
                <TableCell>{obj.tipo}</TableCell>
                <TableCell>{renderStatus(obj.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return <Loading />;
  }
  return (
    <Container>
      <TableContainer component={Paper} style={{ padding: 16 }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Agendamentos
        </Typography>
        <Heading>
          <Divider style={{ margin: '16px 0px 8px' }} />
          <div>
            <AddButton component={RouterLink} to={'/agendamento/cadastro'}>
              Novo Agendamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        {renderTable()}
      </TableContainer>

      <TableContainer component={Paper} style={{ padding: 16 }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Pendências
        </Typography>
        <AddButton component={RouterLink} to={'/agendamento/cadastro'}>
          Novo Agendamento
        </AddButton>
        {renderTable()}
      </TableContainer>
    </Container>
  );
}
