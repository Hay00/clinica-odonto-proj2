import React from 'react';

// Ícones
import { FaNodeJs, FaReact, FaGithub } from 'react-icons/fa';

import { Container, LinkButton, Text, Wrapper } from './styles';

export default function Footer() {
  return (
    <Container>
      <Wrapper>
        <Text>Clinica Odonto Copyright ©</Text>
        <LinkButton href="https://github.com/Hay00/clinica-odonto-proj2">
          <FaGithub color="#000" size={30} />
        </LinkButton>
      </Wrapper>
      <Wrapper>
        <Text>Tecnologias utilizadas:</Text>
        <LinkButton>
          <FaReact color="#61dbfb" size={30} />
        </LinkButton>
        <LinkButton>
          <FaNodeJs color="#7fbb42" size={30} />
        </LinkButton>
      </Wrapper>
    </Container>
  );
}
