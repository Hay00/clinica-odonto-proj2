import React from 'react';

//Router
import { Switch } from 'react-router-dom';

// Páginas
import CadastroFinanceiro from '../../pages/Financeiro';
import ListFinanceiro from '../../pages/ListFinanceiro';

// Rota Privada
import { PrivateRoute } from '../PrivateRoute';

export default function FinanceiroRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ListFinanceiro} />
      <PrivateRoute
        exact
        path={`${path}/cadastro`}
        component={CadastroFinanceiro}
      />
      <PrivateRoute
        path={`${path}/editar/:id`}
        component={CadastroFinanceiro}
      />
    </Switch>
  );
}
