import React from 'react';

//Router
import { Switch } from 'react-router-dom';

// Páginas
import Medicamento from '../../pages/Medicamento';
import ListMedicamentos from '../../pages/ListMedicamentos';

// Rota Privada
import { PrivateRoute } from '../PrivateRoute';

export default function MedicamentoRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ListMedicamentos} />
      <PrivateRoute exact path={`${path}/cadastro`} component={Medicamento} />
      <PrivateRoute path={`${path}/editar/:id`} component={Medicamento} />
    </Switch>
  );
}
