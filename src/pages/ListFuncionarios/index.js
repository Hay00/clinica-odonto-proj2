import React, { useEffect, useState } from 'react';

// Material UI
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
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
import DateTransformer from '../../utils/dateTransformer';
import TableContent from '../../components/TableContent';

export default function ListFuncionarios({ history }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os funcionários usando a API
   */
  useEffect(() => {
    api
      .get('/funcionarios')
      .then(({ data }) => {
        if (data.values.length) {
          setFuncionarios(data.values);
        } else {
          setFuncionarios(null);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  /**
   * Abre a página para realizar alterações no funcionário
   *
   * @param {String} id id do funcionário
   */
  function handleEdit(id) {
    history.push(`/funcionario/editar/${id}`);
  }

  /**
   * Abre uma janela de dialogo para remover um funcionário
   * @param {String} id id do funcionário
   */
  function handleRemove(id) {
    setToRemove(id);
    setShowDialog(true);
  }

  /**
   * Ao confirmar um funcionário é deletado
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/funcionarios/${toRemove}`);
      if (result) {
        const rest = funcionarios.filter(
          ({ idFuncionario }) => idFuncionario !== toRemove
        );
        setFuncionarios(rest.length ? rest : null);
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
   * Busca um funcionário a partir do cliente
   *
   * @param {String} texto string a ser buscada
   */
  async function onSearch(texto) {
    try {
      const json = {
        params: { text: texto.toLowerCase() },
      };
      const { data } = await api.get('/funcionarios/buscar/', json);
      if (data.values.length) {
        setFuncionarios(data.values);
      } else {
        setFuncionarios(null);
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
      const { data } = await api.get('/funcionarios');
      if (data.values.length) {
        setFuncionarios(data.values);
      } else {
        setFuncionarios(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Renderiza o body da tabela
   */
  function renderTableBody() {
    return funcionarios.map((obj) => (
      <TableRow key={obj.idFuncionario} hover role="checkbox">
        <TableCell>{obj.nome}</TableCell>
        <TableCell>{obj.cpf}</TableCell>
        <TableCell>{DateTransformer.toBrl(obj.dataNascimento)}</TableCell>
        <TableCell>{obj.sexo}</TableCell>
        <TableCell>
          <ButtonGroup
            variant="text"
            color="default"
            aria-label="botoẽs de ações da agenda"
          >
            <CustomButton
              color="secondary"
              onClick={() => handleEdit(obj.idFuncionario)}
            >
              <EditIcon />
            </CustomButton>
            <CustomButton
              color="error"
              onClick={() => handleRemove(obj.idFuncionario)}
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
          Funcionários
        </Typography>
        <Heading>
          <div>
            <Search
              placeholder={'Buscar funcionário por nome'}
              onSearch={onSearch}
              clearSearch={clearSearch}
            />
          </div>
          <Divider style={{ margin: '16px 0px 8px' }} />
          <div>
            <AddButton component={RouterLink} to={'/funcionario/cadastro'}>
              Novo Funcionário
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <TableContent
          columns={['Nome', 'CPF', 'Data Nascimento', 'Sexo']}
          hasActions
          body={renderTableBody()}
          data={funcionarios}
        />
      </TableContainer>
      <DialogBox
        type={'question'}
        title={'Remover Funcionário?'}
        message={'Você realmente deseja remover este funcionário'}
        open={showDialog}
        onAccept={onAcceptDialog}
        closeDialog={closeDialog}
      />
    </Container>
  );
}
