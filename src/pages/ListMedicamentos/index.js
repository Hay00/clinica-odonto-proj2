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

import { AddButton, Container, Heading } from './styles';

// Componentes
import CustomButton from '../../components/CustomButton';
import DialogBox from '../../components/DialogBox';
import Search from '../../components/Search';

// Api
import api from '../../services/api';
import TableContent from '../../components/TableContent';

export default function ListMedicamentos({ history }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  /**
   * Busca os medicamentos usando a API
   */
  useEffect(() => {
    api
      .get('/medicamentos')
      .then(({ data }) => {
        if (data.values.length) {
          setMedicamentos(data.values);
        } else {
          setMedicamentos(null);
        }
      })
      .catch((error) => console.log(error.message));
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
   * Renderiza o body da tabela
   */
  function renderTableBody() {
    return medicamentos.map((obj) => (
      <TableRow key={obj.idMedicamento} hover role="checkbox">
        <TableCell>{obj.nome}</TableCell>
        <TableCell>{obj.unidades}</TableCell>
        <TableCell>R$ {obj.valor}</TableCell>
        <TableCell>
          <ButtonGroup
            variant="text"
            color="default"
            aria-label="botoẽs de ações da agenda"
          >
            <CustomButton
              color="secondary"
              onClick={() => handleEdit(obj.idMedicamento)}
            >
              <EditIcon />
            </CustomButton>
            <CustomButton
              color="error"
              onClick={() => handleRemove(obj.idMedicamento)}
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
        <TableContent
          columns={['Nome', 'Unidades', 'Valor']}
          hasActions
          body={renderTableBody()}
          data={medicamentos}
        />
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
