import React, { useEffect, useState } from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useParams } from 'react-router';

import Loading from '../../components/Loading';

import api from '../../services/api';

import { Container, InputContainer, SaveButton } from './styles';

export default function CadastroMedicamento({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/medicamento/editar/');

  const [loading, setLoading] = useState(isEdit);

  const [nome, setNome] = useState('');
  const [unidades, setUnidades] = useState(0);
  const [valor, setValor] = useState('0,00');

  /**
   * Busca os dados do medicamento a ser alterado
   */
  useEffect(() => {
    if (isEdit) {
      api
        .get(`/medicamentos/${id}`)
        .then(({ data }) => {
          setNome(data.values.nome);
          setUnidades(data.values.unidades);
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
    if (!(nome && unidades && valor)) return;
    try {
      const json = {
        nome,
        unidades,
        valor,
      };

      let result = false;
      if (isEdit) {
        result = await api.put(`/medicamentos/${id}`, json);
      } else {
        result = await api.post('/medicamentos', json);
      }
      if (result) {
        history.push('/medicamento');
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
          Cadastro Medicamento
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <InputContainer>
        <TextField
          label="Nome Medicamento"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={({ target }) => setNome(target.value)}
        />
      </InputContainer>
      <InputContainer style={{ maxWidth: 200 }}>
        <TextField
          label="Unidades"
          variant="outlined"
          type="number"
          fullWidth
          value={unidades}
          onChange={({ target }) => setUnidades(target.value)}
        />
      </InputContainer>
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
