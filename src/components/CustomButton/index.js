import React from 'react';

import { StyledButton } from './styles';

export default function CustomButton({ children, ...otherProps }) {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
}
