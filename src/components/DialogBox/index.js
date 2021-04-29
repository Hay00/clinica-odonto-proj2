import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogBox({
  type,
  title,
  message,
  open,
  closeDialog,
  onAccept,
}) {
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type === 'question' && (
          <>
            <Button onClick={closeDialog} color="secondary">
              Não
            </Button>
            <Button onClick={onAccept} color="secondary" autoFocus>
              Sim
            </Button>
          </>
        )}
        {type === 'message' && (
          <Button onClick={closeDialog} color="secondary" autoFocus>
            Ok
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
