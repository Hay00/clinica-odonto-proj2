import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import CadastroMedicamento from '../../pages/CadastroMedicamento';

export default function Medicamento({ match }) {
  const { path } = match;
  return (
    <Switch>
      {/* <Route exact path={path} component={ListClientes} /> */}
      <Route exact path={`${path}/cadastro`} component={CadastroMedicamento} />
      <Route path={`${path}/editar/:id`} component={CadastroMedicamento} />
    </Switch>
  );
}
