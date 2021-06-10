import React, { useEffect, useState } from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import { Container, Heading, AddButton } from './styles';

// Api back-end
import api from '../../services/api';

// Componentes
import TableContent from '../../components/TableContent';

export default function Main() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [financas, setFinancas] = useState([]);

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
          data={agendamentos}
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
          columns={[
            'Contato',
            'Data',
            'Tipo',
            'Descrição',
            'Situação',
            'Valor',
          ]}
          data={financas}
        />
      </TableContainer>
    </Container>
  );
}
