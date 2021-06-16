import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: ${({ open }) => (open ? 220 : 60)}px;
  position: fixed;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
  flex-shrink: 0;
  white-space: nowrap;
`;
