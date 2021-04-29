import React from 'react';
// Css e styles
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

// Dom Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Componentes
import Header from './components/Header';

import GlobalStyles from './globalStyles';

// Páginas
import Compras from './pages/Compras';
import Financeiro from './pages/Financeiro';
import Login from './pages/Login';
import Main from './pages/Main';
import Pagamento from './pages/Pagamento';
import Relatorios from './pages/Relatorios';
import Venda from './pages/Venda';

// Rotas
import Agendamento from './routes/Agendamento';
import Cliente from './routes/Cliente';
import Equipamento from './routes/Equipamento';
import Funcionario from './routes/Funcionario';
import Medicamento from './routes/Medicamento';

// Tema
import { defaultTheme } from './theme';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <div style={{ display: 'flex' }}>
          <Header />
          <div style={{ marginTop: 64, width: '100%' }}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/agendamento" component={Agendamento} />
              <Route path="/cliente" component={Cliente} />
              <Route path="/equipamento" component={Equipamento} />
              <Route path="/funcionario" component={Funcionario} />
              <Route path="/medicamento" component={Medicamento} />
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
      </ThemeProvider>
    </BrowserRouter>
  );
}
