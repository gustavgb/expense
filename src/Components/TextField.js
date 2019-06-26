import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.palette.grays(80)};
  border-radius: 5px;
  display: block;
  margin-bottom: 1rem;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`

const TextField = ({
  onChange,
  value,
  hidden,
  fullWidth,
  ...props
}) => (
  <Input
    onChange={({ target: { value } }) => onChange(value)}
    value={value}
    type={hidden ? 'password' : 'text'}
    fullWidth={fullWidth}
    {...props}
  />
)

TextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hidden: PropTypes.bool,
  fullWidth: PropTypes.bool
}

export default TextField
