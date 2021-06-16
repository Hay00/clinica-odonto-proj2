import styled from 'styled-components';

import { FaTooth } from 'react-icons/fa';

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
