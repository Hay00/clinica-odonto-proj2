import React from 'react';

import { FaNodeJs, FaReact, FaGithub } from 'react-icons/fa';

import { Container, LinkButton, Text } from './styles';

function Footer() {
  return (
    <Container>
      <LinkButton href="https://github.com/Hay00/clinica-odonto-proj2">
        <FaGithub color="#000" size={30} />
      </LinkButton>
      <Text>Tecnologias utilizadas:</Text>
      <LinkButton>
        <FaReact color="#61dbfb" size={30} />
      </LinkButton>
      <LinkButton>
        <FaNodeJs color="#7fbb42" size={30} />
      </LinkButton>
    </Container>
  );
}

export default Footer;
