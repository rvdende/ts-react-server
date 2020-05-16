import styled from 'styled-components';

export const InputColor = styled.input`
background: ${({ theme }) => theme.body};
  border-radius: 4px;
  border: none;
margin: 0px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  transition: all 0.15s linear;
  border: 2px solid  rgba(0,0,0,0);
  outline:0;
  display: block;
  border: 0;
  padding: 2px;

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