import styled from 'styled-components';

import { FaTooth } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
`;

export const Drawer = styled.div`
  width: ${({ open }) => (open ? 220 : 60)}px;

  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const Logo = styled(FaTooth)`
  margin: 8px;
`;

export const User = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 0 auto;
  margin-right: 0px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
