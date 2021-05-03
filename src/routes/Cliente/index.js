import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import CadastroCliente from '../../pages/CadastroCliente';

export default function ClienteRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      {/* <Route exact path={path} component={ListClientes} /> */}
      <Route exact path={`${path}/cadastro`} component={CadastroCliente} />
      <Route path={`${path}/editar/:id`} component={CadastroCliente} />
    </Switch>
  );
}
