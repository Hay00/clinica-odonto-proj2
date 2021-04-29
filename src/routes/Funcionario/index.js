import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import CadastroFuncionario from '../../pages/CadastroFuncionario';

export default function Funcionario({ match }) {
  const { path } = match;
  return (
    <Switch>
      {/* <Route exact path={path} component={ListClientes} /> */}
      <Route exact path={`${path}/cadastro`} component={CadastroFuncionario} />
      <Route path={`${path}/editar/:id`} component={CadastroFuncionario} />
    </Switch>
  );
}
