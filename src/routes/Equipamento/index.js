import React from 'react';

//Router
import { Route, Switch } from 'react-router-dom';

// Páginas
import CadastroEquipamento from '../../pages/CadastroEquipamento';

export default function Equipamento({ match }) {
  const { path } = match;
  return (
    <Switch>
      {/* <Route exact path={path} component={ListEquipamentos} /> */}
      <Route exact path={`${path}/cadastro`} component={CadastroEquipamento} />
      <Route path={`${path}/editar/:id`} component={CadastroEquipamento} />
    </Switch>
  );
}
