import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  color: white;
  line-height: 80px;
  align-items: center;
  padding: 0px 20px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
`;

export const Text = styled.p`
  color: #000;
  margin-left: 4px;
`;

export const Wrapper = styled.div`
  display: inline-flex;
`;

export const LinkButton = styled.a`
  display: flex;
  align-items: center;
  margin: 1em;
`;
