import React, { useEffect, useState } from 'react';


import DateFnsUtils from '@date-io/date-fns';
// Material UI
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import { useParams } from 'react-router';

import Loading from '../../components/Loading';

import api from '../../services/api';

import { Container, InputContainer, SaveButton } from './styles';

export default function LançamentoFinanceiro({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/financeiro/editar/');

  const [loading, setLoading] = useState(isEdit);

  const [tipo, setTipo] = useState('despesa');
  const [descricao, setDescricao] = useState('');
  const [pessoa, setPessoa] = useState('');
  const [situacao, setSituacao] = useState('nao pago');
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState('0,00');
  /**
   * Busca os dados do medicamento a ser alterado
   */
  
  useEffect(() => {
    if (isEdit) {
      api
        .get(`/financeiro/${id}`)
        .then(({ data }) => {
          setDescricao(data.values.descricao);
          setPessoa(data.values.devedor);
          setValor(data.values.valor);
          setLoading(false);
        })
        .catch((error) => console.log(error.message));
    }
  }, [id, isEdit]);

  /**
   * Formata o valor para BRL
   *
   * @param {Event} event evento do input
   */
  function handleValorChange({ target }) {
    var v = target.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
    setValor(v);
  }

  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    if (!(descricao && situacao && data && valor && pessoa && tipo)) return;
    try {
      const json = {
        descricao,
        situacao,
        data,
        valor,
        devedor:pessoa,
        tipo,
      };

      let result = false;
      if (isEdit) {
        result = await api.put(`/financeiro/${id}`, json);
      } else {
        result = await api.post('/financeiro', json);
      }
      if (result) {
        history.push('/financeiro');
      }
    } catch (error) {
      console.log(error.message);
    }
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
          Lançamento Financeiro
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 280 }}>
          <InputLabel id="select-situacao-label">Tipo</InputLabel>
          <Select
            labelId="select-tipo-label"
            id="select-tipo"
            value={tipo}
            onChange={({ target }) => setTipo(target.value)}
            label="tipo"
          >
            <MenuItem value={'despesa'}>Despesa</MenuItem>
            <MenuItem value={'receita'}>Receita</MenuItem>
          </Select>
        </FormControl>
      </div>



      <InputContainer>
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          value={descricao}
          onChange={({ target }) => setDescricao(target.value)}
        />
      </InputContainer>


      <InputContainer>
        <TextField
          label="Meliante"
          variant="outlined"
          fullWidth
          value={pessoa}
          onChange={({ target }) => setPessoa(target.value)}
        />
      </InputContainer>


      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 280 }}>
          <InputLabel id="select-situacao-label">Situação</InputLabel>
          <Select
            labelId="select-cliente-label"
            id="select-situacao"
            value={situacao}
            onChange={({ target }) => setSituacao(target.value)}
            label="Situacao"
          >
            <MenuItem value={'pago'}>Pago</MenuItem>
            <MenuItem value={'nao pago'}>Não Pago</MenuItem>
          </Select>
        </FormControl>
      </div>

      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <KeyboardDatePicker
            style={{ margin: 8, width: 165 }}
            id={'date'}
            name={'date'}
            autoOk
            variant={'inline'}
            inputVariant={'outlined'}
            label={'Data'}
            format={'dd/MM/yyyy'}
            value={data}
            onChange={setData}
          />
    
        </MuiPickersUtilsProvider>
      <FormControl variant="outlined" style={{ margin: 8, width: '25ch' }}>
        <InputLabel htmlFor="adornment-password">Valor</InputLabel>
        <OutlinedInput
          type="text"
          pattern="[0-9]*"
          id="outlined-adornment-valor"
          label="Valor"
          value={valor}
          onChange={handleValorChange}
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
          aria-describedby="outlined-valor-helper-text"
          inputProps={{
            'aria-label': 'valor',
          }}
          labelWidth={0}
        />
      </FormControl>
      <div style={{ margin: 8 }}>
        <SaveButton onClick={onSave}>Salvar</SaveButton>
      </div>
    </Container>
  );
}
