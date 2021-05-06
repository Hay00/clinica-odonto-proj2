import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';

// Material UI
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import { useParams } from 'react-router';

import Loading from '../../components/Loading';

// Api back-end
import api from '../../services/api';

import { Container, InputContainer, SaveButton } from './styles';

export default function CadastroCliente({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/cliente/editar/');

  const [loading, setLoading] = useState(isEdit);

  // Cadastro
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState(new Date());
  const [sexo, setSexo] = useState('Feminino');
  const [errCpf, setErrCpf] = useState(false);

  /**
   * Busca os dados do cliente a ser alterado
   */
  useEffect(() => {
    api
      .get(`/clientes/${id}`)
      .then(({ data }) => {
        setNome(data.values.nome);
        setCpf(data.values.cpf);
        setDate(new Date(data.values.dataNascimento));
        setSexo(data.values.sexo);
        setLoading(false);
      })
      .catch(({ message }) => console.log(message));
  }, [id, isEdit]);

  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    if (errCpf) return;
    try {
      const json = {
        nome,
        cpf,
        dataNascimento: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`,
        sexo,
      };

      let result = false;
      if (isEdit) {
        result = await api.put(`/clientes/${id}`, json);
      } else {
        result = await api.post('/clientes', json);
      }
      if (result) {
        history.push('/cliente');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Faz a validação de um cpf
   *
   * @param {String} cpf
   * @returns boolean
   */
  function validaCpf(cpf) {
    let soma, resto, i;
    soma = 0;
    if (cpf === '00000000000') return false;

    for (i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
    }

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
    }

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  /**
   * Formata cpf
   *
   * @param {Event} event
   */
  function handleCpfChange({ target }) {
    let { value } = target;
    // Apenas números
    value = value.replace(/[^\d]/g, '');

    setErrCpf(!validaCpf(value));

    // Formata o CPF
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    setCpf(value);
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
          Cadastro Cliente
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <InputContainer>
        <TextField
          label="Nome do Cliente"
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