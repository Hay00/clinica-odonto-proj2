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

import { AddButton, Container, Heading, Message, Remove } from './styles';
import Loading from '../../components/Loading';
import Search from '../../components/Search';
import DialogBox from '../../components/DialogBox';
import api from '../../services/api';

export default function ListMedicamentos({ history }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os medicamentos usando a API
   */
  useEffect(() => {
    async function getMedicamentos() {
      try {
        const { data } = await api.get('/medicamentos');
        if (data.values.length) {
          setMedicamentos(data.values);
        } else {
          setMedicamentos(null);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getMedicamentos();
  }, []);

  /**
   * Abre a página para realizar alterações no medicamento
   *
   * @param {String} id id do medicamento
   */
  function handleEdit(id) {
    history.push(`/medicamento/editar/${id}`);
  }

  /**
   * Abre uma janela de dialogo para remover um medicamento
   * @param {String} id id do medicamento
   */
  function handleRemove(id) {
    setToRemove(id);
    setShowDialog(true);
  }

  /**
   * Ao confirmar um medicamento é deletado
   */
  async function onAcceptDialog() {
    try {
      const result = await api.delete(`/medicamentos/${toRemove}`);
      if (result) {
        const rest = medicamentos.filter(
          ({ idMedicamento }) => idMedicamento !== toRemove
        );
        setMedicamentos(rest.length ? rest : null);
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
   * Busca um medicamento a partir do cliente
   *
   * @param {String} texto string a ser buscada
   */
  async function onSearch(texto) {
    try {
      const json = {
        params: { text: texto.toLowerCase() },
      };
      const { data } = await api.get('/medicamentos/buscar/', json);
      if (data.values.length) {
        setMedicamentos(data.values);
      } else {
        setMedicamentos(null);
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
      const { data } = await api.get('/medicamentos');
      if (data.values.length) {
        setMedicamentos(data.values);
      } else {
        setMedicamentos(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Renderiza a tabela de acordo com os dados
   *
   * @returns SJX
   */
  function renderTable() {
    const center = { display: 'flex', justifyContent: 'center' };

    if (medicamentos === null) {
      return <Message>Nenhum medicamento encontrado!</Message>;
    }
    if (medicamentos.length) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nome</b>
              </TableCell>
              <TableCell>
                <b>Unidades</b>
              </TableCell>
              <TableCell>
                <b>Tipo</b>
              </TableCell>
              <TableCell>
                <b style={center}>Ações</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicamentos.map((obj) => (
              <TableRow key={obj.idMedicamento} hover role="checkbox">
                <TableCell>{obj.nome}</TableCell>
                <TableCell>{obj.unidades}</TableCell>
                <TableCell>{/*renderStatus(obj.status)*/}</TableCell>
                <TableCell style={center}>
                  <IconButton onClick={() => handleEdit(obj.idMedicamento)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemove(obj.idMedicamento)}>
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
          Medicamentos
        </Typography>
        <Heading>
          <div>
            <Search
              placeholder={'Buscar medicamento por nome'}
              onSearch={onSearch}
              clearSearch={clearSearch}
            />
          </div>
          <Divider style={{ margin: '16px 0px 8px' }} />
          <div>
            <AddButton component={RouterLink} to={'/medicamento/cadastro'}>
              Novo Medicamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        {renderTable()}
      </TableContainer>
      <DialogBox
        type={'question'}
        title={'Remover Medicamento?'}
        message={'Você realmente deseja remover este medicamento'}
        open={showDialog}
        onAccept={onAcceptDialog}
        closeDialog={closeDialog}
      />
    </Container>
  );
}
