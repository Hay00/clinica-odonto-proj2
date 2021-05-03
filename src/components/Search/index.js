import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';

import { Container, Input } from './styles';

function Search({ placeholder, onSearch, clearSearch }) {
  const [input, setInput] = useState('');

  /**
   * Limpa a busca
   */
  function clear() {
    setInput('');
    clearSearch();
  }

  /**
   * Ao pressionar enter realiza a busca
   */
  function keyPress({ keyCode }) {
    if (keyCode === 13) {
      onSearch(input);
    }
  }

  /**
   * Altera o input e se a pesquisa for limpada faz uma chamada
   *
   * @param {Event} event evento do componente input
   */
  function handleInput({ target }) {
    if (input.length > 0 && target.value.length === 0) {
      clearSearch();
    }
    setInput(target.value);
  }

  return (
    <Container>
      <Input
        value={input}
        onKeyDown={keyPress}
        onChange={handleInput}
        placeholder={placeholder}
      />
      {input && (
        <IconButton onClick={clear}>
          <CancelIcon color={'error'} />
        </IconButton>
      )}
      <IconButton onClick={() => onSearch(input)}>
        <SearchIcon color={'secondary'} />
      </IconButton>
    </Container>
  );
}

export default Search;
