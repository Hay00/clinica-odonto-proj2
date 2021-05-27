import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  @media (min-width: 0px) {
    max-width: 444px;
  }

  @media (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarIcon = styled(Avatar)`
  margin: 8px;
  background-color: var(--clr-secondary);
`;

export const ErrorMessage = styled.p`
  color: var(--clr-error);
  text-align: center;
  font-size: 16px;
  padding: 8px;
`;
