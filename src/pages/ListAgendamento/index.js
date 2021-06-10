import React, { useEffect, useState } from 'react';

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import { AddButton, Container, Heading } from './styles';

// Api back-end
import api from '../../services/api';

// Componentes
import CustomButton from '../../components/CustomButton';
import DialogBox from '../../components/DialogBox';
import Search from '../../components/Search';
import TableContent from '../../components/TableContent';

export default function ListAgendamentos({ history }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os agendamentos usando a API
   */
  useEffect(() => {
    api
      .get('/agendamentos', { params: { format: true } })
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
   * Marca como concluído o agendamento
   *
   * @param {String} idAgenda id do agendamento
   */
  async function handleComplete(idAgenda, status) {
    try {
      const result = await api.put(`/agendamentos/completo/${idAgenda}`, {
        concluida: !status,
      });
      if (result) {
        const values = agendamentos.map((obj) => {
          obj.status = obj.id === idAgenda ? !status : obj.status;
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
   * @param {String} idAgenda id do agendamento
   */
  function handleEdit(idAgenda) {
    history.push(`/agendamento/editar/${idAgenda}`);
  }

  /**
   * Abre uma janela de dialogo para remover um agendamento
   * @param {String} idAgenda id do agendamento
   */
  function handleRemove(idAgenda) {
    setToRemove(idAgenda);
    setShowDialog(true);
  }

  /**
   * Ao confirmar um agendamento é deletado
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/agendamentos/${toRemove}`);
      if (result) {
        const rest = agendamentos.filter(({ id }) => id !== toRemove);
        setAgendamentos(rest.length ? rest : null);
      }
      setToRemove(null);
      setShowDialog(false);
    } catch (error) {
      console.log(error.message);
    }
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
      const { data } = await api.get('/agendamentos', { params: { format: true } });
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
   * Renderiza o body da tabela
   */
  function renderActions() {
    if (!agendamentos) return null;
    return agendamentos.map((obj) => (
      <ButtonGroup variant="text" color="default" aria-label="botoẽs de ações">
        <CustomButton
          color="success"
          onClick={() => handleComplete(obj.id, obj.status)}
        >
          <DoneIcon />
        </CustomButton>
        <CustomButton color="secondary" onClick={() => handleEdit(obj.id)}>
          <EditIcon />
        </CustomButton>
        <CustomButton color="error" onClick={() => handleRemove(obj.id)}>
          <DeleteIcon />
        </CustomButton>
      </ButtonGroup>
    ));
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
        <TableContent
          columns={['Cliente', 'Dentista', 'Data', 'Tipo', 'Status']}
          actions={renderActions()}
          data={agendamentos}
        />
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
