import React from 'react';

// Componentes Material-ui
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

// Ícones
import BuildIcon from '@material-ui/icons/Build';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { GiMedicines } from 'react-icons/gi';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

import { Container } from './styles';

export default function Drawer({ openDrawer }) {
  return (
    <Container variant="permanent" open={openDrawer}>
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
    </Container>
  );
}
