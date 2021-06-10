import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';

// Material UI
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import { Container, SaveButton } from './styles';

// Api back-end
import api from '../../services/api';

import { useParams } from 'react-router';

import Loading from '../../components/Loading';

import DateTransformer from '../../utils/dateTransformer';

export default function CadastroAgendamento({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/agendamento/editar/');

  const [loading, setLoading] = useState(true);

  // Listas de clientes, dentistas e tipos
  const [clientes, setClientes] = useState([
    { idCliente: 1, nome: 'Carregando...' },
  ]);
  const [dentistas, setDentistas] = useState([
    { idFuncionario: 1, nome: 'Carregando...' },
  ]);
  const [tipos, setTipos] = useState([{ idTipo: 1, nome: 'Carregando...' }]);

  // Quais as opções que estão selecionadas
  const [selectCliente, setSelectCliente] = useState(1);
  const [selectDentista, setSelectDentista] = useState(1);
  const [selectType, setSelectType] = useState(1);

  // Data e hora
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());

  /**
   * Busca os tipos de agendamentos
   */
  useEffect(() => {
    async function getData() {
      try {
        // Busca clientes
        const apiClientes = await api.get('/clientes');
        setClientes(apiClientes.data.values);
        setSelectCliente(apiClientes.data.values[0].idCliente);

        // Busca dentistas
        const apiDentistas = await api.get('/funcionarios/dentistas');
        setDentistas(apiDentistas.data.values);
        setSelectDentista(apiDentistas.data.values[0].idFuncionario);

        // Busca tipos de agendamento
        const apiTipos = await api.get('/agendamentos/tipos');
        setTipos(apiTipos.data.types);
        setSelectType(apiTipos.data.types[0].idTipo);

        // Se for edição de agendamento
        if (isEdit) {
          const { data } = await api.get(`/agendamentos/${id}`);
          setSelectCliente(data.values.idCliente);
          setSelectDentista(data.values.idFuncionario);
          setSelectType(data.values.idTipo);
          setDate(new Date(data.values.data));
          const [hora, minuto] = data.values.hora.split(':');
          const clienteHora = new Date().setHours(hora, minuto);
          setHour(new Date(clienteHora));
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getData();
  }, [id, isEdit]);

  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    try {
      let timeMinutes = hour.getMinutes();
      timeMinutes = timeMinutes > 10 ? timeMinutes : `0${timeMinutes}`;

      const json = {
        idCliente: selectCliente,
        idFuncionario: selectDentista,
        idTipo: selectType,
        data: DateTransformer.toSql(date),
        hora: `${hour.getHours()}:${timeMinutes}`,
        concluida: false,
      };

      let result = false;
      if (isEdit) {
        result = await api.put(`/agendamentos/${id}`, json);
      } else {
        result = await api.post('/agendamentos', json);
      }
      if (result) {
        history.push('/agendamento');
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
          Cadastro de Agendamento
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 280 }}>
          <InputLabel id="select-cliente-label">Cliente</InputLabel>
          <Select
            labelId="select-cliente-label"
            id="select-cliente"
            value={selectCliente}
            onChange={({ target }) => setSelectCliente(target.value)}
            label="Cliente"
          >
            {clientes.map(({ idCliente, nome }) => (
              <MenuItem key={idCliente} value={idCliente}>
                {nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 280 }}>
          <InputLabel id="select-dentista-label">Dentista</InputLabel>
          <Select
            labelId="select-dentista-label"
            id="select-dentista"
            value={selectDentista}
            onChange={({ target }) => setSelectDentista(target.value)}
            label="Dentista"
          >
            {dentistas.map(({ idFuncionario, nome }) => (
              <MenuItem key={idFuncionario} value={idFuncionario}>
                {nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 220 }}>
          <InputLabel id="select-tipo-agendamento-label">
            Tipo de Agendamento
          </InputLabel>
          <Select
            labelId="select-tipo-agendamento-label"
            id="select-tipo-agendamento"
            value={selectType}
            onChange={({ target }) => setSelectType(target.value)}
            label="Tipo de Agendamento"
          >
            {tipos.map(({ idTipo, nome }) => (
              <MenuItem key={idTipo} value={idTipo}>
                {nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <KeyboardDatePicker
            style={{ margin: 8, width: 185 }}
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
