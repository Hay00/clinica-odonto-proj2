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

// Componentes
import DialogBox from '../../components/DialogBox';
import Loading from '../../components/Loading';
import Search from '../../components/Search';

// Api
import api from '../../services/api';

import { AddButton, Container, Heading, Message, Remove } from './styles';

export default function ListClientes({ history }) {
  const [clientes, setClientes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os clientes usando a API
   */
  useEffect(() => {
    async function getClientes() {
      try {
        const { data } = await api.get('/clientes');
        if (data.values.length) {
          setClientes(data.values);
        } else {
          setClientes(null);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getClientes();
  }, []);

  /**
   * Abre a página para realizar alterações no cliente
   *
   * @param {String} id id do cliente
   */
  function handleEdit(id) {
    history.push(`/cliente/editar/${id}`);
  }

  /**
   * Abre uma janela de dialogo para remover um cliente
   * @param {String} id id do cliente
   */
  function handleRemove(id) {
    setToRemove(id);
    setShowDialog(true);
  }

  /**
   * Ao confirmar um cliente é deletado
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/clientes/${toRemove}`);
      if (result) {
        const rest = clientes.filter(({ idCliente }) => idCliente !== toRemove);
        setClientes(rest.length ? rest : null);
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
   * Busca um cliente a partir do cliente
   *
   * @param {String} texto string a ser buscada
   */
  async function onSearch(texto) {
    try {
      const json = {
        params: { text: texto.toLowerCase() },
      };
      const { data } = await api.get('/clientes/buscar/', json);
      if (data.values.length) {
        setClientes(data.values);
      } else {
        setClientes(null);
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
      const { data } = await api.get('/clientes');
      if (data.values.length) {
        setClientes(data.values);
      } else {
        setClientes(null);
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
  function parseDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
  }

  /**
   * Renderiza a tabela de acordo com os dados
   *
   * @returns SJX
   */
  function renderTable() {
    const center = { display: 'flex', justifyContent: 'center' };

    if (clientes === null) {
      return <Message>Nenhum cliente encontrado!</Message>;
    }
    if (clientes.length) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nome</b>
              </TableCell>
              <TableCell>
                <b>CPF</b>
              </TableCell>
              <TableCell>
                <b>Data Nascimento</b>
              </TableCell>
              <TableCell>
                <b>Sexo</b>
              </TableCell>
              <TableCell>
                <b style={center}>Ações</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((obj) => (
              <TableRow key={obj.idCliente} hover role="checkbox">
                <TableCell>{obj.nome}</TableCell>
                <TableCell>{obj.cpf}</TableCell>
                <TableCell>{parseDate(obj.dataNascimento)}</TableCell>
                <TableCell>{obj.sexo}</TableCell>
                <TableCell style={center}>
                  <IconButton onClick={() => handleEdit(obj.idCliente)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(obj.idCliente)}>
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
          Clientes
        </Typography>
        <Heading>
          <div>
            <Search
              placeholder={'Buscar cliente por nome'}
              onSearch={onSearch}
              clearSearch={clearSearch}
            />
          </div>
          <Divider style={{ margin: '16px 0px 8px' }} />
          <div>
            <AddButton component={RouterLink} to={'/cliente/cadastro'}>
              Novo Cliente
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        {renderTable()}
      </TableContainer>
      <DialogBox
        type={'question'}
        title={'Remover Cliente?'}
        message={'Você realmente deseja remover este cliente'}
        open={showDialog}
        onAccept={onAcceptDialog}
        closeDialog={closeDialog}
      />
    </Container>
  );
}
