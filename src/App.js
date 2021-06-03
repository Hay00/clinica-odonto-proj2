import React from 'react';

// Css e styles
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

// Dom Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Componentes
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

// Tema
import { defaultTheme } from './theme';

export default function App() {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <div style={{ display: 'flex' }}>
            <Header />
            <div
              style={{
                marginTop: 64,
                width: '100%',
                minHeight: 'calc(-48px + 90vh)',
                padding: '40px 40px 0 40px',
              }}
            >
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/agendamento" component={AgendamentoRoute} />
                <Route path="/cliente" component={ClienteRoute} />
                <Route path="/equipamento" component={EquipamentoRoute} />
                <Route path="/financeiro" component={FinanceiroRoute} />
                <Route path="/funcionario" component={FuncionarioRoute} />
                <Route path="/medicamento" component={MedicamentoRoute} />
                <Route exact path="/compras" component={Compras} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/pagamento" component={Pagamento} />
                <Route exact path="/relatorios" component={Relatorios} />
                <Route exact path="/venda" component={Venda} />
              </Switch>
            </div>
          </div>
          <Footer />
          <CssBaseline />
          <GlobalStyles />
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}
