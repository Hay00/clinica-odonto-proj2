import React, { useEffect, useState } from 'react';

// Componentes Material-ui
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

// Ícones
import BuildIcon from '@material-ui/icons/Build';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { GiMedicines } from 'react-icons/gi';

// Link do router
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';

// API
import { getUser, isAuthenticated, logout } from '../../services/auth';
import { Container, Drawer, Logo, User } from './styles';

export default function Header() {
  const location = useLocation();
  const history = useHistory();

  const [hasLogin, setHasLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    setHasLogin(isAuthenticated());
  }, [location]);

  /**
   * Associa o componente aberto
   * @param {Event} event evento do componente
   */
  function handleClick(event) {
    setOpenMenu(event.currentTarget);
  }

  /**
   * Fecha o menu
   */
  function handleClose() {
    setOpenMenu(null);
  }

  /**
   * Faz o logoff do user
   */
  function handleLogOut() {
    setOpenMenu(null);
    logout();
    history.push('/login');
  }

  return (
    <Container>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(!openDrawer)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <Logo size={26} />
          </IconButton>
          <Typography variant="h6" noWrap>
            Clinica Odonto
          </Typography>
          {hasLogin && (
            <User>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircleIcon
                  fontSize={'large'}
                  style={{ color: 'white' }}
                />
              </IconButton>
              <Menu
                id="user-menu"
                style={{ marginTop: '60px' }}
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleClose}
              >
                <Typography
                  style={{ padding: '6px 16px' }}
                  variant="subtitle1"
                  gutterBottom
                >
                  {getUser() || 'Anon'}
                </Typography>
                <MenuItem onClick={handleLogOut}>Sair</MenuItem>
              </Menu>
            </User>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawer}>
        <List style={{ marginTop: 60 }}>
          <ListItem button component={RouterLink} to={'/'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Inicio'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/agendamento'}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={'Agenda'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/cliente'}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Clientes'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/financeiro'}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={'Financeiro'} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button component={RouterLink} to={'/equipamento'}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary={'Equipamentos'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/funcionario'}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={'Funcionários'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/medicamento'}>
            <ListItemIcon>
              <GiMedicines size={22} />
            </ListItemIcon>
            <ListItemText primary={'Medicamentos'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/relatorios'}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={'Relatórios'} />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
}
