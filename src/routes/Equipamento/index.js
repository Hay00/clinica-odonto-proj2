import React from 'react';

//Router
import { Switch } from 'react-router-dom';

// Páginas
import Equipamento from '../../pages/Equipamento';
import ListEquipamentos from '../../pages/ListEquipamentos';

// Rota Privada
import { PrivateRoute } from '../PrivateRoute';

export default function EquipamentoRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ListEquipamentos} />
      <PrivateRoute exact path={`${path}/cadastro`} component={Equipamento} />
      <PrivateRoute path={`${path}/editar/:id`} component={Equipamento} />
    </Switch>
  );
}
