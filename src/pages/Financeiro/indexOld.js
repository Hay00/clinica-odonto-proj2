import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { CenterFocusStrong } from '@material-ui/icons';
//import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    width: '100%',
    justifyContent: 'center'
  },
}));

export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            className={classes.item}
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                //Conexão com o banco, pegar financeiro do mes atual, ter campo para escolher data/mes <ListItemText id={labelId} primary={`Conta de Agua | Não Pago | 07/04/2021 | R$ ${value + 1}`}/>
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>

            <ListItemText
              id={labelId}
              primary={`Conta de Energia | Pago | 01/04/2021 | R$ ${value + 1}`}
            />

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments"></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
