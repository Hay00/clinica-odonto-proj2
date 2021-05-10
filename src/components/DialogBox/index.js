import React from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomButton from '../CustomButton';

function DialogBox(props) {
  const { type, title, message, open, closeDialog, onAccept } = props;
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
            <CustomButton onClick={closeDialog} color="error">
              Não
            </CustomButton>
            <CustomButton onClick={onAccept} color="secondary" autoFocus>
              Sim
            </CustomButton>
          </>
        )}
        {type === 'message' && (
          <CustomButton onClick={closeDialog} color="secondary" autoFocus>
            Ok
          </CustomButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

DialogBox.propTypes = {
  type: PropTypes.oneOf(['message', 'question']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default DialogBox;
