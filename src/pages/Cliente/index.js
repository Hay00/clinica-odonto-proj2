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
import { TextareaAutosize } from '@material-ui/core';
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
import cpfUtil from '../../utils/cpfUtils';

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
    if (isEdit) {
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
    }
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

      <div>
        <TextareaAutosize
            style={{ margin: 10, minWidth: 200 }}
            fullWidth
            rowsMax={3}
            aria-label="maximum height"
            placeholder="Insira aqui a Anamnese"   
        />
      </div>

      <div style={{ margin: 8 }}>
        <SaveButton onClick={onSave}>Salvar</SaveButton>
      </div>
    </Container>
  );
}
