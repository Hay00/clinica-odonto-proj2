import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
// import CadastroFinanceiro from '../../pages/Financeiro';
import ListFinanceiro from '../../pages/ListFinanceiro';

export default function FinanceiroRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ListFinanceiro} />
      {/* <Route exact path={`${path}/cadastro`} component={CadastroFinanceiro} /> */}
      {/* <Route path={`${path}/editar/:id`} component={CadastroFinanceiro} /> */}
    </Switch>
  );
}
