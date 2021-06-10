import React, { useEffect, useState } from 'react';

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

// Componentes
import CustomButton from '../../components/CustomButton';
import DialogBox from '../../components/DialogBox';
import Search from '../../components/Search';
import TableContent from '../../components/TableContent';

// Api
import api from '../../services/api';

import { AddButton, Container, Heading } from './styles';

export default function ListFinanceiro({ history }) {
  const [financas, setFinancas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca as finanças usando a API
   */
  useEffect(() => {
    api
      .get('/financeiro', { params: { format: true } })
      .then(({ data }) => {
        if (data.values.length) {
          setFinancas(data.values);
        } else {
          setFinancas(null);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  /**
   * Abre a página para realizar alterações da finança
   *
   * @param {String} idTransacao id da finança
   */
  function handleEdit(idTransacao) {
    history.push(`/financeiro/editar/${idTransacao}`);
  }

  /**
   * Abre uma janela de dialogo para remover da finança
   *
   * @param {String} idTransacao id da finança
   */
  function handleRemove(idTransacao) {
    setToRemove(idTransacao);
    setShowDialog(true);
  }

  /**
   * Ao confirmar a finança é deletada
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/financeiro/${toRemove}`);
      if (result) {
        const rest = financas.filter(({ id }) => id !== toRemove);
        setFinancas(rest.length ? rest : null);
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
   * Busca da finança a partir do devedor
   *
   * @param {String} texto string a ser buscada
   */
  async function onSearch(texto) {
    try {
      const json = {
        params: { text: texto.toLowerCase() },
      };
      const { data } = await api.get('/financeiro/buscar/', json);
      if (data.values.length) {
        setFinancas(data.values);
      } else {
        setFinancas(null);
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
      const { data } = await api.get('/financeiro', { params: { format: true } });
      if (data.values.length) {
        setFinancas(data.values);
      } else {
        setFinancas(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Renderiza o body da tabela
   */
  function renderActions() {
    if (!financas) return null;
    return financas.map((obj) => (
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
          Financeiro
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
            <AddButton component={RouterLink} to={'/financeiro/cadastro'}>
              Novo lançamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <TableContent
          columns={[
            'Contato',
            'Data',
            'Tipo',
            'Descrição',
            'Situação',
            'Valor',
          ]}
          actions={renderActions()}
          data={financas}
        />
      </TableContainer>
      <DialogBox
        type={'question'}
        title={'Remover Finança?'}
        message={'Você realmente deseja remover esta finança?'}
        open={showDialog}
        onAccept={onAcceptDialog}
        closeDialog={closeDialog}
      />
    </Container>
  );
}
