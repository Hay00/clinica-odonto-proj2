import React from 'react';

//Router
import { Switch } from 'react-router-dom';

// Páginas
import Funcionario from '../../pages/Funcionario';
import ListFuncionarios from '../../pages/ListFuncionarios';

// Rota Privada
import { PrivateRoute } from '../PrivateRoute';

export default function FuncionarioRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ListFuncionarios} />
      <PrivateRoute exact path={`${path}/cadastro`} component={Funcionario} />
      <PrivateRoute path={`${path}/editar/:id`} component={Funcionario} />
    </Switch>
  );
}
