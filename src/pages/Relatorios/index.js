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

export default function Relatorios({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/relatorios/editar/');

  const [loading, setLoading] = useState(isEdit);

  const [tipo, setTipo] = useState('extrato financeiro');
  const [dataIn, setDataIn] = useState(new Date());
  const [dataOut, setDataOut] = useState(new Date());
  /**
   * Busca os dados do medicamento a ser alterado
   */


  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    if (!(dataIn && dataOut && tipo)) return;
    try {
      const json = {
        tipo,
        dataIn,
        dataOut
      };

      let result = false;
      if (isEdit) {
        result = await api.put(`/relatorio/${id}`, json);
      } else {
        result = await api.post('/relatorio', json);
      }
      if (result) {
        history.push('/relatorio');
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
          Relatorios
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
            <MenuItem value={'extrato financeiro'}>Extrato Financeiro</MenuItem>
            <MenuItem value={'estoque'}>Estoque</MenuItem>
            <MenuItem value={'vendas'}>Vendas</MenuItem>
            <MenuItem value={'laudos'}>Laudos</MenuItem>
            <MenuItem value={'receita'}>Receita</MenuItem>
            <MenuItem value={'compras pendentes'}>Compras Pendentes</MenuItem>
            <MenuItem value={'clientes atendidos'}>Clientes Atendidos</MenuItem>

          </Select>
        </FormControl>




      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <KeyboardDatePicker
            style={{ margin: 8, width: 165 }}
            id={'dateIn'}
            name={'dateIn'}
            autoOk
            variant={'inline'}
            inputVariant={'outlined'}
            label={'Data Inicial'}
            format={'dd/MM/yyyy'}
            value={dataIn}
            onChange={setDataIn}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <KeyboardDatePicker
            style={{ margin: 8, width: 165 }}
            id={'dateIn'}
            name={'dateIn'}
            autoOk
            variant={'inline'}
            inputVariant={'outlined'}
            label={'Data Final'}
            format={'dd/MM/yyyy'}
            value={dataOut}
            onChange={setDataOut}
          />
    
        </MuiPickersUtilsProvider>

    
    <div style={{ margin: 2}}>
        <SaveButton onClick={onSave}>Buscar</SaveButton>
       </div>
       </div>
    </Container>
  );
}
