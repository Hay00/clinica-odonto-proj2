import React, { useEffect, useState } from 'react';

// Componentes Material-ui
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Ícones
import MenuIcon from '@material-ui/icons/Menu';

// Link do router
import { useHistory, useLocation } from 'react-router-dom';

// API
import { getUser, isAuthenticated, logout } from '../../services/auth';

import { Logo, User } from './styles';

export default function Header({ toggleDrawer }) {
  const location = useLocation();
  const history = useHistory();

  const [hasLogin, setHasLogin] = useState(false);
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
    <AppBar position="fixed" style={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Logo size={26} />
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
  );
}
