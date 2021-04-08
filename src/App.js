import React from 'react';
// Dom Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalStyles from './globalStyles';

// Páginas
import Agendamentos from './pages/Agendamentos';
import Atendimento from './pages/Atendimento';
import CadastroCliente from './pages/CadastroCliente';
import CadastroEquipamento from './pages/CadastroEquipamento';
import CadastroFuncionario from './pages/CadastroFuncionario';
import CadastroMedicamento from './pages/CadastroMedicamento';
import Compras from './pages/Compras';
import Financeiro from './pages/Financeiro';
import Main from './pages/Main';
import Login from './pages/Login';
import Pagamento from './pages/Pagamento';
import Relatorios from './pages/Relatorios';
import Venda from './pages/Venda';
import Header from './components/Header';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Header />
        <div style={{ marginTop: 64 }}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/agendamento" component={Agendamentos} />
            <Route exact path="/atendimento" component={Atendimento} />
            <Route
              exact
              path="/cadastrar/cliente"
              component={CadastroCliente}
            />
            <Route
              exact
              path="/cadastrar/equipamento"
              component={CadastroEquipamento}
            />
            <Route
              exact
              path="/cadastrar/funcionario"
              component={CadastroFuncionario}
            />
            <Route
              exact
              path="/cadastrar/medicamento"
              component={CadastroMedicamento}
            />
            <Route exact path="/compras" component={Compras} />
            <Route exact path="/financeiro" component={Financeiro} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/pagamento" component={Pagamento} />
            <Route exact path="/relatorios" component={Relatorios} />
            <Route exact path="/venda" component={Venda} />
          </Switch>
        </div>
      </div>
      {/* <Footer /> */}
      <CssBaseline />
      <GlobalStyles />
    </BrowserRouter>
  );
}
