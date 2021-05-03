import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import Equipamento from '../../pages/Equipamento';
import ListEquipamentos from '../../pages/ListEquipamentos';

export default function EquipamentoRoute({ match }) {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ListEquipamentos} />
      <Route exact path={`${path}/cadastro`} component={Equipamento} />
      <Route path={`${path}/editar/:id`} component={Equipamento} />
    </Switch>
  );
}
