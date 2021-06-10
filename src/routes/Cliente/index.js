import React from 'react';

//Router
import { Switch } from 'react-router-dom';

// Páginas
import CadastroCliente from '../../pages/Cliente';
import ListClientes from '../../pages/ListClientes';

// Rota Privada
import { PrivateRoute } from '../PrivateRoute';

export default function ClienteRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ListClientes} />
      <PrivateRoute
        exact
        path={`${path}/cadastro`}
        component={CadastroCliente}
      />
      <PrivateRoute path={`${path}/editar/:id`} component={CadastroCliente} />
    </Switch>
  );
}
