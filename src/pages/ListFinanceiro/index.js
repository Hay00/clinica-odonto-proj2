import React, { useEffect, useState } from 'react';

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
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

// Api
import api from '../../services/api';

import DateTransformer from '../../utils/dateTransformer';
import { AddButton, Container, Heading } from './styles';
import TableContent from '../../components/TableContent';

export default function ListFinanceiro({ history }) {
  const [financas, setFinancas] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca as finanças usando a API
   */
  useEffect(() => {
    api
      .get('/financeiro')
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
   * @param {String} id id da finança
   */
  function handleEdit(id) {
    history.push(`/financeiro/editar/${id}`);
  }

  /**
   * Abre uma janela de dialogo para remover da finança
   * @param {String} id id da finança
   */
  function handleRemove(id) {
    setToRemove(id);
    setShowDialog(true);
  }

  /**
   * Ao confirmar a finança é deletada
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/financeiro/${toRemove}`);
      if (result) {
        const rest = financas.filter(
          ({ idTransacao }) => idTransacao !== toRemove
        );
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
      const { data } = await api.get('/financeiro');
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
   * Renderiza o status do financeiro
   *
   * @param {Boolean} status status do financeiro
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
   * Renderiza o body da tabela
   */
  function renderTableBody() {
    if (!financas) return null;
    return financas.map((obj) => (
      <TableRow key={obj.idTransacao} hover role="checkbox">
        <TableCell>{obj.contato}</TableCell>
        <TableCell>{DateTransformer.toBrl(obj.data)}</TableCell>
        <TableCell>{obj.descricao}</TableCell>
        <TableCell>{obj.tipo}</TableCell>
        <TableCell>{renderStatus(obj.situacao)}</TableCell>
        <TableCell>R$ {obj.valor}</TableCell>
        <TableCell>
          <ButtonGroup
            variant="text"
            color="default"
            aria-label="botoẽs de ações da agenda"
          >
            <CustomButton
              color="secondary"
              onClick={() => handleEdit(obj.idTransacao)}
            >
              <EditIcon />
            </CustomButton>
            <CustomButton
              color="error"
              onClick={() => handleRemove(obj.idTransacao)}
            >
              <DeleteIcon />
            </CustomButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
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
          hasActions
          body={renderTableBody()}
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
