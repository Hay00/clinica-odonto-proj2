import React, { useEffect, useState } from 'react';

// Material UI
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useParams } from 'react-router';

import Loading from '../../components/Loading';

// Api back-end
import api from '../../services/api';

import { Container, InputContainer, SaveButton } from './styles';

export default function CadastroEquipamento({ history, location }) {
  const { id } = useParams();
  const isEdit = location.pathname.includes('/equipamento/editar/');

  const [loading, setLoading] = useState(isEdit);

  const [nome, setNome] = useState('');
  const [unidades, setUnidades] = useState(0);

  /**
   * Busca os dados do equipamento a ser alterado
   */
  useEffect(() => {
    if (isEdit) {
      api
        .get(`/equipamentos/${id}`)
        .then(({ data }) => {
          setNome(data.values.nome);
          setUnidades(data.values.unidades);
          setLoading(false);
        })
        .catch((error) => console.log(error.message));
    }
  }, [id, isEdit]);

  /**
   * Salva o novo agendamento usando a API
   */
  async function onSave() {
    try {
      const json = {
        nome,
        unidades,
      };

      let result = false;
      if (isEdit) {
        result = await api.put(`/equipamentos/${id}`, json);
      } else {
        result = await api.post('/equipamentos', json);
      }
      if (result) {
        history.push('/equipamento');
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
          Cadastro Equipamento
        </Typography>
      </div>
      <Divider style={{ margin: 8 }} />
      <InputContainer>
        <TextField
          label="Nome Equipamento"
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
      <div style={{ margin: 8 }}>
        <SaveButton onClick={onSave}>Salvar</SaveButton>
      </div>
    </Container>
  );
}
