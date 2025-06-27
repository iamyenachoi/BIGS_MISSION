import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 18px;
  font-size: 0.95em;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: black;
  color: white;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;