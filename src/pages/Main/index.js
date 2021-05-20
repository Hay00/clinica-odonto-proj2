import React, { useEffect, useState } from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import { Container, Heading, AddButton } from './styles';

// Api back-end
import api from '../../services/api';

// Componentes
import TableContent from '../../components/TableContent';

import DateTransformer from '../../utils/dateTransformer';

export default function Main() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [financas, setFinancas] = useState([]);

  /**
   * Busca os agendamentos usando a API
   */
  useEffect(() => {
    api
      .get('/agendamentos')
      .then(({ data }) => {
        if (data.values.length) {
          setAgendamentos(data.values);
        } else {
          setAgendamentos(null);
        }
      })
      .catch((error) => console.log(error.message));
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
      <TableContainer component={Paper} style={{ padding: 16 }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Agendamentos
        </Typography>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <Heading>
          <div>
            <AddButton component={RouterLink} to={'/agendamento/cadastro'}>
              Novo Agendamento
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <TableContent
          columns={['Cliente', 'Dentista', 'Data', 'Tipo', 'Status']}
          body={agendamentos.map((obj) => (
            <TableRow key={obj.idAgenda} hover role="checkbox">
              <TableCell>{obj.cliente}</TableCell>
              <TableCell>{obj.dentista}</TableCell>
              <TableCell>
                {DateTransformer.toBrl(obj.data)} - {obj.hora}
              </TableCell>
              <TableCell>{obj.tipo}</TableCell>
              <TableCell>{renderStatus(obj.status)}</TableCell>
            </TableRow>
          ))}
          data={financas}
        />
      </TableContainer>

      <TableContainer component={Paper} style={{ padding: 16 }}>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Financeiro
        </Typography>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <Heading>
          <div>
            <AddButton component={RouterLink} to={'/financeiro/cadastro'}>
              Nova Finança
            </AddButton>
          </div>
        </Heading>
        <Divider style={{ margin: '16px 0px 8px' }} />
        <TableContent
          columns={['Cliente', 'Data', 'Descrição', 'Situação', 'Valor']}
          body={financas.map((obj) => (
            <TableRow key={obj.idTransacao} hover role="checkbox">
              <TableCell>{obj.devedor}</TableCell>
              <TableCell>{DateTransformer.toBrl(obj.data)}</TableCell>
              <TableCell>{obj.descricao}</TableCell>
              <TableCell>{renderStatus(obj.situacao)}</TableCell>
              <TableCell>R$ {obj.valor}</TableCell>
            </TableRow>
          ))}
          data={financas}
        />
      </TableContainer>
    </Container>
  );
}
/*
<TableContent
  columns={['Cliente', 'Data', 'Descrição', 'Situação', 'Valor']}
  body={renderTableBody()}
  data={data}
/>
*/

/**
 * Renderiza o body da tabela
 */
function renderTableBody() {
  return null;
}
