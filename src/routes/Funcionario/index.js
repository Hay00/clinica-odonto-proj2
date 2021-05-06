import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import CadastroFuncionario from '../../pages/CadastroFuncionario';
import ListFuncionarios from '../../pages/ListFuncionarios';

export default function FuncionarioRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ListFuncionarios} />
      <Route exact path={`${path}/cadastro`} component={CadastroFuncionario} />
      <Route path={`${path}/editar/:id`} component={CadastroFuncionario} />
    </Switch>
  );
}
