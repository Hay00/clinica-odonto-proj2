import React from 'react';

//Router
import { Switch } from 'react-router-dom';

// Páginas
import Agendamento from '../../pages/Agendamento';
import ListAgendamento from '../../pages/ListAgendamento';

// Rota Privada
import { PrivateRoute } from '../PrivateRoute';

export default function AgendamentoRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ListAgendamento} />
      <PrivateRoute path={`${path}/cadastro`} component={Agendamento} />
      <PrivateRoute path={`${path}/editar/:id`} component={Agendamento} />
    </Switch>
  );
}
