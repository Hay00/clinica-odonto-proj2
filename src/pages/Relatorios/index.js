import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';

// Material UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

// Componentes
import Loading from '../../components/Loading';
import TableContent from '../../components/TableContent';

// Api
import api from '../../services/api';

import DateTransformer from '../../utils/dateTransformer';

import { Container } from './styles';

export default function Relatorios({ history, location }) {
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState('agendamentos');
  const [type, setType] = useState('agendamentos');

  const [tableData, setTableData] = useState(null);

  const [dataIn, setDataIn] = useState(new Date());
  const [dataOut, setDataOut] = useState(new Date());

  const hasDate = selected === 'agendamentos' || selected === 'financeiro';

  async function onSearch() {
    setLoading(true);
    setType(selected);
    try {
      let json = { params: '' };
      if (hasDate) {
        json.params = {
          dataInicio: DateTransformer.toSql(dataIn),
          dataFinal: DateTransformer.toSql(dataOut),
        };
      }
      const { data } = await api.get(`/relatorios/${selected}`, json);
      if (data.values.length) {
        setTableData(data.values);
      } else {
        setTableData(null);
      }
    } catch (e) {
      console.log(e.message);
      setTableData(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  const tableColumns = {
    agendamentos: ['Cliente', 'Dentista', 'Data', 'Tipo', 'Status'],
    financeiro: ['Contato', 'Data', 'Tipo', 'Descrição', 'Situação', 'Valor'],
    equipamentos: ['Nome', 'Unidades'],
    medicamentos: ['Nome', 'Unidades', 'Valor'],
  };

  return (
    <Container>
      <div>
        <Typography style={{ margin: 8 }} color="primary" variant="h6">
          Relatorios
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormControl variant="outlined" style={{ margin: 8, minWidth: 280 }}>
          <InputLabel id="select-situacao-label">Tipo</InputLabel>
          <Select
            labelId="select-tipo-label"
            id="select-tipo"
            value={selected}
            onChange={({ target }) => setSelected(target.value)}
            label="tipo"
          >
            <MenuItem value={'agendamentos'}>Clientes Atendidos</MenuItem>
            <MenuItem value={'financeiro'}>Extrato Financeiro</MenuItem>
            <MenuItem value={'equipamentos'}>Estoque Equipamentos</MenuItem>
            <MenuItem value={'medicamentos'}>Estoque Medicamentos</MenuItem>
          </Select>
        </FormControl>

        {hasDate && (
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
              <KeyboardDatePicker
                style={{ margin: 8, width: 185 }}
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
                style={{ margin: 8, width: 185 }}
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
          </>
        )}
        <div style={{ marginLeft: 8 }}>
          <Button variant="contained" color="secondary" onClick={onSearch}>
            Buscar
          </Button>
        </div>
      </div>
      <Divider style={{ margin: 8 }} />
      <div style={{ margin: '8px' }}>
        <TableContainer>
          <Typography style={{ margin: 8 }} color="primary" variant="h6">
            Resultado
          </Typography>
          {loading ? (
            <Loading />
          ) : (
            <TableContent columns={tableColumns[type]} data={tableData} />
          )}
        </TableContainer>
      </div>
    </Container>
  );
}
