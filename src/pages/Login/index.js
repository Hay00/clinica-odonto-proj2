import React, { useState } from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { AvatarIcon, Container, ErrorMessage, Wrapper } from './styles';

// Api back-end
import api from '../../services/api';

import cpfUtil from '../../utils/cpfUtils';

import { login as loginUser } from '../../services/auth';

export default function Login({ history }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  function handleLoginChange({ target }) {
    let { value } = target;
    setLogin(cpfUtil.mask(value));
  }

  /**
   * Realiza o login do usuário
   *
   * @param {Event} event do componente
   */
  async function makeLogin(event) {
    event.preventDefault();

    if (!login || !senha) {
      setError('Preencha login e senha para continuar!');
    } else {
      api
        .post('/funcionarios/login', { login, senha })
        .then(({ data }) => {
          loginUser(data.token, data.user);
          history.push('/');
        })
        .catch((e) =>
          setError('Não foi possível realizar o login, dados inválidos')
        );
    }
  }

  return (
    <Container>
      <Wrapper>
        <AvatarIcon>
          <LockOutlinedIcon />
        </AvatarIcon>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: '100%', marginTop: '8px' }} onSubmit={makeLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="login"
            autoComplete="cpf"
            autoFocus
            value={login}
            inputProps={{ maxLength: 14 }}
            onChange={handleLoginChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={({ target }) => setSenha(target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Não possue uma conta? Inscreva-se
              </Link>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link
            color="inherit"
            href="https://github.com/Hay00/clinica-odonto-proj2"
          >
            Clinica Odonto
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  );
}
