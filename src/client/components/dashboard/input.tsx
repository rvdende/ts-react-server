import styled from 'styled-components';

export const Input = styled.input`
  background: ${({ theme }) => theme.body};
  border-radius: ${({ theme }) => theme.radius};
  border: none;
  margin: 0px;
  padding: ${({ theme }) => theme.padding};
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  border: 2px solid  ${({ theme }) => theme.bodyAlt};
  outline:0;
  width: 100%;

  &[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

  :hover  {
    color: ${({ theme }) => theme.body};
    background: ${({ theme }) => theme.focusColor};
    cursor: pointer;
  }

  :focus {
      outline:0;
      border: 2px solid  ${({ theme }) => theme.focusColor};
      color: 2px solid  ${({ theme }) => theme.focusColor};
  }
`;