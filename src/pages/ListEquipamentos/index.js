import React, { useEffect, useState } from 'react';

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

// Componentes
import CustomButton from '../../components/CustomButton';
import DialogBox from '../../components/DialogBox';
import Search from '../../components/Search';

// Api
import api from '../../services/api';

import { AddButton, Container, Heading } from './styles';
import TableContent from '../../components/TableContent';

export default function ListEquipamentos({ history }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os equipamentos usando a API
   */
  useEffect(() => {
    api
      .get('/equipamentos', { params: { format: true } })
      .then(({ data }) => {
        if (data.values.length) {
          setEquipamentos(data.values);
        } else {
          setEquipamentos(null);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  /**
   * Abre a página para realizar alterações no equipamento
   *
   * @param {String} idEquipamento id do equipamento
   */
  function handleEdit(idEquipamento) {
    history.push(`/equipamento/editar/${idEquipamento}`);
  }

  /**
   * Abre uma janela de dialogo para remover um equipamento
   * @param {String} idEquipamento id do equipamento
   */
  function handleRemove(idEquipamento) {
    setToRemove(idEquipamento);
    setShowDialog(true);
  }

  /**
   * Ao confirmar um equipamento é deletado
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/equipamentos/${toRemove}`);
      if (result) {
        const rest = equipamentos.filter(({ id }) => id !== toRemove);
        setEquipamentos(rest.length ? rest : null);
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
   * Busca um equipamento a partir do cliente
   *
   * @param {String} texto string a ser buscada
   */
  async function onSearch(texto) {
    try {
      const json = {
        params: { text: texto.toLowerCase() },
      };
      const { data } = await api.get('/equipamentos/buscar/', json);
      if (data.values.length) {
        setEquipamentos(data.values);
      } else {
        setEquipamentos(null);
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
      const { data } = await api.get('/equipamentos', { params: { format: true } });
      if (data.values.length) {
        setEquipamentos(data.values);
      } else {
        setEquipamentos(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Renderiza o body da tabela
   */
  function renderActions() {
    if (!equipamentos) return null;
    return equipamentos.map((obj) => (
      <ButtonGroup variant="text" color="default" aria-label="botoẽs de ações">
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
          Equipamentos
        </Typography>
        <Heading>
          <div>
            <Search
              placeholder={'Buscar equipamento por nome'}
              onSearch={onSearch}
              clearSearch={clearSearch}
            />
          </div>
          <Divider style={{ margin: '16px 0px 8px' }} />
          <div>
            <AddButton component={RouterLink} to={'/equipamento/cadastro'}>
              Novo Equipamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <TableContent
          columns={['Nome', 'Unidades']}
          actions={renderActions()}
          data={equipamentos}
        />
      </TableContainer>
      <DialogBox
        type={'question'}
        title={'Remover Equipamento?'}
        message={'Você realmente deseja remover este equipamento'}
        open={showDialog}
        onAccept={onAcceptDialog}
        closeDialog={closeDialog}
      />
    </Container>
  );
}
