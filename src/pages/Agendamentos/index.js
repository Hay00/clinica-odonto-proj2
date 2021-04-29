import React, { useEffect, useState } from 'react';

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

// Api back-end
import api from '../../services/api';
import Loading from '../../components/Loading';
import DialogBox from '../../components/DialogBox';

export default function Agendamentos({ history }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os agendamentos usando a API
   */
  useEffect(() => {
    async function getAgendamentos() {
      try {
        const { data } = await api.get('/agendamentos');
        setAgendamentos(data.values);
      } catch (error) {
        console.log(error.message);
      }
    }

    getAgendamentos();
  }, []);

  /**
   * Marca como concluído o agendamento
   *
   * @param {String} id id do agendamento
   */
  function handleComplete(id) {
    console.log('change complete');
  }

  /**
   * Abre a página para realizar alterações no agendamento
   *
   * @param {String} id id do agendamento
   */
  function handleEdit(id) {
    history.push(`/agendamento/editar/${id}`);
  }

  /**
   * Abre uma janela de dialogo para remover um agendamento
   * @param {String} id id do agendamento
   */
  function handleRemove(id) {
    setToRemove(id);
    setShowDialog(true);
  }

  /**
   * Ao confirmar um agendamento é deletado
   */
  async function onAcceptDialog() {
    const result = await api.delete(`/agendamentos/${toRemove}`);
    if (result) {
      const rest = agendamentos.filter(({ idAgenda }) => idAgenda !== toRemove);
      setAgendamentos(rest);
    }
    setToRemove(null);
    setShowDialog(false);
  }

  /**
   * Fecha a cáixa de diálogo
   */
  function closeDialog() {
    setShowDialog(false);
  }

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
        {agendamentos.length ? (
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
                <TableCell>
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agendamentos.map(
                ({ idAgenda, idCliente, data, hora, concluida }) => (
                  <TableRow key={idAgenda} hover role="checkbox">
                    <TableCell>{idCliente}</TableCell>
                    <TableCell>{'Nenhum'}</TableCell>
                    <TableCell>{parseDate(data, hora)}</TableCell>
                    <TableCell>{'Nenhum'}</TableCell>
                    <TableCell>{renderStatus(concluida)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleComplete(idAgenda)}>
                        <Complete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(idAgenda)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemove(idAgenda)}>
                        <Remove />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        ) : (
          <Loading />
        )}
      </TableContainer>
      <DialogBox
        type={'question'}
        title={'Remover Agendamento?'}
        message={'Você realmente deseja remover este agendamento'}
        open={showDialog}
        onAccept={onAcceptDialog}
        closeDialog={closeDialog}
      />
    </Container>
  );
}
