import React, { useState } from 'react';

// Css e styles
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

// Dom Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Componentes
import Drawer from './components/Drawer';
import Footer from './components/Footer';
import Header from './components/Header';
import GlobalStyles from './globalStyles';

// Páginas
import Compras from './pages/Compras';
import Login from './pages/Login';
import Main from './pages/Main';
import Pagamento from './pages/Pagamento';
import Relatorios from './pages/Relatorios';
import Venda from './pages/Venda';

// Rotas
import AgendamentoRoute from './routes/Agendamento';
import ClienteRoute from './routes/Cliente';
import EquipamentoRoute from './routes/Equipamento';
import FinanceiroRoute from './routes/Financeiro';
import FuncionarioRoute from './routes/Funcionario';
import MedicamentoRoute from './routes/Medicamento';
import { PrivateRoute } from './routes/PrivateRoute';

// Tema
import { defaultTheme } from './theme';

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
  }

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header toggleDrawer={toggleDrawer} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Drawer openDrawer={openDrawer} />
              <div
                style={{
                  marginTop: 64,
                  marginLeft: openDrawer ? 220 : 60,
                  width: '100%',
                  minHeight: 'calc(100vh - 64px - 80px)',
                  padding: '40px 40px 0 40px',
                  transition:
                    'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                }}
              >
                <Switch>
                  <PrivateRoute exact path="/" component={Main} />
                  <PrivateRoute
                    path="/agendamento"
                    component={AgendamentoRoute}
                  />
                  <PrivateRoute path="/cliente" component={ClienteRoute} />
                  <PrivateRoute
                    path="/equipamento"
                    component={EquipamentoRoute}
                  />
                  <PrivateRoute
                    path="/financeiro"
                    component={FinanceiroRoute}
                  />
                  <PrivateRoute
                    path="/funcionario"
                    component={FuncionarioRoute}
                  />
                  <PrivateRoute
                    path="/medicamento"
                    component={MedicamentoRoute}
                  />
                  <PrivateRoute exact path="/compras" component={Compras} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/pagamento" component={Pagamento} />
                  <PrivateRoute
                    exact
                    path="/relatorios"
                    component={Relatorios}
                  />
                  <PrivateRoute exact path="/venda" component={Venda} />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>
          <CssBaseline />
          <GlobalStyles />
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}
