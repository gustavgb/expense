import styled from 'styled-components'

const Button = styled.button`
  padding: 0.5rem 0.8rem;
  text-align: center;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  margin: 1rem 0;
  display: block;
  cursor: pointer;
`

export default Button
