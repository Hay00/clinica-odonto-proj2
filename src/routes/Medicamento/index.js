import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import Medicamento from '../../pages/Medicamento';
import ListMedicamentos from '../../pages/ListMedicamentos';

export default function MedicamentoRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ListMedicamentos} />
      <Route exact path={`${path}/cadastro`} component={Medicamento} />
      <Route path={`${path}/editar/:id`} component={Medicamento} />
    </Switch>
  );
}
