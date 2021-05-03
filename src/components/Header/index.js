import React, { useState } from 'react';

// Componentes Material-ui
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

// Ícones
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

import clsx from 'clsx';

import { GiMedicines } from 'react-icons/gi';

// Link do router
import { Link as RouterLink } from 'react-router-dom';
import { Container, Logo, User, useStyles } from './styles';

export default function Header({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

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

  return (
    <Container>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <Logo size={26} />
          </IconButton>
          <Typography variant="h6" noWrap>
            Clinica Odonto
          </Typography>
          {true && (
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
                  email.exemplo@mail.com
                </Typography>
                <MenuItem onClick={() => console.log('logout')}>Sair</MenuItem>
              </Menu>
            </User>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpenDrawer(false)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
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

          <ListItem button component={RouterLink} to={'/'}>
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
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary={'Equipamentos'} />
          </ListItem>

          <ListItem button component={RouterLink} to={'/'}>
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
