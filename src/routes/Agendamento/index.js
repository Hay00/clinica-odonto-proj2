import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import Agendamento from '../../pages/Agendamento';
import ListAgendamento from '../../pages/ListAgendamento';

export default function AgendamentoRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ListAgendamento} />
      <Route path={`${path}/cadastro`} component={Agendamento} />
      <Route path={`${path}/editar/:id`} component={Agendamento} />
    </Switch>
  );
}
