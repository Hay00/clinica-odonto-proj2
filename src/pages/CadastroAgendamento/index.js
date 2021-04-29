import React, { useState } from 'react';

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
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import { Container, InputContainer, SaveButton } from './styles';

// Api back-end
import api from '../../services/api';

export default function CadastroAgendamento({ history }) {
  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [type, setType] = useState(1);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());

  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    try {
      let timeMinutes = hour.getMinutes();
      timeMinutes = timeMinutes > 10 ? timeMinutes : `0${timeMinutes}`;
      const result = await api.post('/agendamentos', {
        idCliente: name,
        data: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        hora: `${hour.getHours()}:${timeMinutes}`,
        concluida: false,
      });
      console.log(result.data);
      if (result) {
        history.push('/agendamento');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <div>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Cadastro de Agendamento
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <InputContainer>
        <TextField
          label="Cliente"
          variant="outlined"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </InputContainer>
      <InputContainer>
        <TextField
          label="Médico Dentista"
          variant="outlined"
          fullWidth
          value={doctor}
          onChange={({ target }) => setDoctor(target.value)}
        />
      </InputContainer>
      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-outlined-label">
            Tipo de Agendamento
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={type}
            onChange={({ target }) => setType(target.value)}
            label="Tipo de Agendamento"
          >
            <MenuItem value={1}>Avaliação</MenuItem>
            <MenuItem value={2}>Manutenção Aparelho</MenuItem>
            <MenuItem value={3}>Cirurgia</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
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
            value={date}
            onChange={setDate}
          />
          <KeyboardTimePicker
            style={{ margin: 8, width: 130 }}
            id={'hour'}
            inputVariant={'outlined'}
            ampm={false}
            label="Hora"
            value={hour}
            onChange={setHour}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ margin: 8 }}>
        <SaveButton onClick={onSave}>Salvar</SaveButton>
      </div>
    </Container>
  );
}
