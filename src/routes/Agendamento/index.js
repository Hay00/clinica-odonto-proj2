import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import Agendamentos from '../../pages/Agendamentos';
import CadastroAgendamento from '../../pages/CadastroAgendamento';

export default function Agendamento({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={Agendamentos} />
      <Route path={`${path}/cadastro`} component={CadastroAgendamento} />
      <Route path={`${path}/editar/:id`} component={CadastroAgendamento} />
    </Switch>
  );
}
