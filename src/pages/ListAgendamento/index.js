import React, { useEffect, useState } from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
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

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import {
  AddButton,
  Complete,
  Container,
  Heading,
  Message,
  Remove,
} from './styles';

// Api back-end
import api from '../../services/api';
import Loading from '../../components/Loading';
import DialogBox from '../../components/DialogBox';
import Search from '../../components/Search';

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
        if (data.values.length) {
          setAgendamentos(data.values);
        } else {
          setAgendamentos(null);
        }
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
  async function handleComplete(id, status) {
    try {
      const result = await api.put(`/agendamentos/completo/${id}`, {
        concluida: !status,
      });
      if (result) {
        const values = agendamentos.map((obj) => {
          obj.status = obj.idAgenda === id ? !status : obj.status;
          return obj;
        });
        setAgendamentos(values);
      }
    } catch (error) {
      console.log(error.message);
    }
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
   * Busca um agendamento a partir do cliente
   *
   * @param {String} texto string a ser buscada
   */
  async function onSearch(texto) {
    try {
      const json = {
        params: { text: texto.toLowerCase() },
      };
      const { data } = await api.get('/agendamentos/buscar/', json);
      if (data.values.length) {
        setAgendamentos(data.values);
      } else {
        setAgendamentos(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Limpa a busca
   */
  async function clearSearch() {
    try {
      const { data } = await api.get('/agendamentos');
      if (data.values.length) {
        setAgendamentos(data.values);
      } else {
        setAgendamentos(null);
      }
    } catch (error) {
      console.log(error.message);
    }
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

  /**
   * Renderiza a tabela de acordo com os dados
   *
   * @returns SJX
   */
  function renderTable() {
    const center = { display: 'flex', justifyContent: 'center' };

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
              <TableCell>
                <b style={center}>Ações</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((obj) => (
              <TableRow key={obj.idAgenda} hover role="checkbox">
                <TableCell>{obj.cliente}</TableCell>
                <TableCell>{obj.dentista}</TableCell>
                <TableCell>{parseDate(obj.data, obj.hora)}</TableCell>
                <TableCell>{obj.tipo}</TableCell>
                <TableCell>{renderStatus(obj.status)}</TableCell>
                <TableCell style={center}>
                  <IconButton
                    onClick={() => handleComplete(obj.idAgenda, obj.status)}
                  >
                    <Complete />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(obj.idAgenda)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(obj.idAgenda)}>
                    <Remove />
                  </IconButton>
                </TableCell>
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
      <TableContainer component={Paper} style={{ padding: '1em' }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Agendamentos
        </Typography>
        <Heading>
          <div>
            <Search
              placeholder={'Buscar por Cliente'}
              onSearch={onSearch}
              clearSearch={clearSearch}
            />
          </div>
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
