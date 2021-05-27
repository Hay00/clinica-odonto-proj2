import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';

// Material UI
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Ícones
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import { useParams } from 'react-router';

import Loading from '../../components/Loading';
// Api back-end

import api from '../../services/api';

import cpfUtil from '../../utils/cpfUtils';

import { Container, InputContainer, SaveButton } from './styles';

export default function CadastroFuncionario({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/funcionario/editar/');

  const [loading, setLoading] = useState(isEdit);

  // Cadastro
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState({
    value: '',
    confirm: '',
    new: '',
    show: false,
    alterar: false,
  });
  const [date, setDate] = useState(new Date());
  const [sexo, setSexo] = useState('Feminino');
  const [errCpf, setErrCpf] = useState(false);

  /**
   * Busca os dados do cliente a ser alterado
   */
  useEffect(() => {
    if (isEdit) {
      api
        .get(`/funcionarios/${id}`)
        .then(({ data }) => {
          setNome(data.values.nome);
          setCpf(data.values.cpf);
          setDate(new Date(data.values.dataNascimento));
          setSexo(data.values.sexo);
          setLoading(false);
        })
        .catch(({ message }) => console.log(message));
    }
  }, [id, isEdit]);

  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    if (errCpf) return;
    // if (isEdit && senha.alterarsenha.value !== senha.confirm) return;
    try {
      const json = {
        nome,
        cpf,
        dataNascimento: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
        senha: senha.value,
        novaSenha: senha.new,
        sexo,
      };
      let result = false;
      if (isEdit) {
        result = await api.put(`/funcionarios/${id}`, json);
      } else {
        result = await api.post('/funcionarios', json);
      }
      if (result) {
        history.push('/funcionario');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Formata cpf
   *
   * @param {Event} event
   */
  function handleCpfChange({ target }) {
    let { value } = target;

    setErrCpf(!cpfUtil.validate(value));

    // Formata o CPF
    setCpf(cpfUtil.mask(value));
  }

  const handlePasswordChange = (type) => (event) => {
    setSenha({ ...senha, [type]: event.target.value });
  };

  function renderPasswordFields() {
    const mainLabel = senha.alterar ? 'Senha Antiga' : 'Confirmar Senha';
    const changeLabel = isEdit ? 'Nova Senha' : 'Senha';

    if (isEdit) {
      return (
        <>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl
              variant="outlined"
              style={{ margin: 8, width: '35ch' }}
            >
              <InputLabel htmlFor="adornment-password">{mainLabel}</InputLabel>
              <OutlinedInput
                id="password-input"
                label={mainLabel}
                type={senha.show ? 'text' : 'password'}
                autoComplete="current-password"
                value={senha.value}
                onChange={handlePasswordChange('value')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="alterne a visibilidade da senha"
                      onClick={() => setSenha({ ...senha, show: !senha.show })}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {senha.show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              style={{ margin: 8 }}
              control={
                <Switch
                  checked={senha.alterar}
                  onChange={() =>
                    setSenha({ ...senha, alterar: !senha.alterar })
                  }
                  name="checkedB"
                  color="primary"
                />
              }
              label="Alterar Senha"
            />
          </div>
          {senha.alterar && (
            <div>
              <FormControl
                variant="outlined"
                style={{ margin: 8, width: '35ch' }}
              >
                <InputLabel htmlFor="adornment-new-password">
                  {changeLabel}
                </InputLabel>
                <OutlinedInput
                  id="new-password-input"
                  label={changeLabel}
                  type={senha.show ? 'text' : 'password'}
                  error={senha.new !== senha.confirm}
                  value={senha.new}
                  onChange={handlePasswordChange('new')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="alterne a visibilidade da senha"
                        onClick={() =>
                          setSenha({ ...senha, show: !senha.show })
                        }
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {senha.show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl
                variant="outlined"
                style={{ margin: 8, width: '35ch' }}
              >
                <InputLabel htmlFor="adornment-confirm-password">
                  Confirmar Senha
                </InputLabel>
                <OutlinedInput
                  id="confirm-password-input"
                  label="Confirmar Senha"
                  error={senha.new !== senha.confirm}
                  type={senha.show ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={senha.confirm}
                  onChange={handlePasswordChange('confirm')}
                />
              </FormControl>
            </div>
          )}
        </>
      );
    }

    return (
      <div>
        <FormControl variant="outlined" style={{ margin: 8, width: '35ch' }}>
          <InputLabel htmlFor="adornment-password">Nova Senha</InputLabel>
          <OutlinedInput
            id="password-input"
            label="Nova Senha"
            type={senha.show ? 'text' : 'password'}
            error={senha.value !== senha.confirm}
            autoComplete="current-password"
            value={senha.value}
            onChange={handlePasswordChange('value')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="alterne a visibilidade da senha"
                  onClick={() => setSenha({ ...senha, show: !senha.show })}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {senha.show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="outlined" style={{ margin: 8, width: '35ch' }}>
          <InputLabel htmlFor="adornment-confirm-password">
            Confirmar Senha
          </InputLabel>
          <OutlinedInput
            id="confirm-password-input"
            label="Confirmar Senha"
            error={senha.value !== senha.confirm}
            type={senha.show ? 'text' : 'password'}
            autoComplete="current-password"
            value={senha.confirm}
            onChange={handlePasswordChange('confirm')}
          />
        </FormControl>
      </div>
    );
  }

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Cadastro Funcionário
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <InputContainer>
        <TextField
          label="Nome do Funcionário"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={({ target }) => setNome(target.value)}
        />
      </InputContainer>
      <InputContainer style={{ maxWidth: 180 }}>
        <TextField
          label="CPF"
          variant="outlined"
          fullWidth
          error={errCpf}
          value={cpf}
          inputProps={{ maxLength: 14 }}
          onChange={handleCpfChange}
        />
      </InputContainer>

      {renderPasswordFields()}

      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <KeyboardDatePicker
            style={{ margin: 8, width: 165 }}
            id={'date'}
            name={'date'}
            autoOk
            variant={'inline'}
            inputVariant={'outlined'}
            label={'Data de Nascimento'}
            format={'dd/MM/yyyy'}
            value={date}
            onChange={setDate}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 160 }}>
          <InputLabel id="select-sexo-label">Sexo</InputLabel>
          <Select
            labelId="select-sexo-label"
            id="select-sexo"
            value={sexo}
            onChange={({ target }) => setSexo(target.value)}
            label="Sexo"
          >
            <MenuItem value={'Feminino'}>Feminino</MenuItem>
            <MenuItem value={'Masculino'}>Masculino</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ margin: 8 }}>
        <SaveButton onClick={onSave}>Salvar</SaveButton>
      </div>
    </Container>
  );
}
