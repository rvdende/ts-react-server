import styled from 'styled-components';

export const Select = styled.select`
  background: ${({ theme }) => theme.body};
  border-radius: 4px;
  border: none;
  margin: 0px;
  padding: 6px 12px;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  transition: all 0.15s linear;
  border: 2px solid  ${({ theme }) => theme.bodyAlt};
  outline:0;

  :disabled {
    opacity: 0.5;
    cursor: none;
    pointer-events:none;
    
    :hover {
      background: ${({ theme }) => theme.body};    
      color: ${({ theme }) => theme.text};
    }
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