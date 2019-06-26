import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from 'Blocks/Button'

import {
  navigateTo
} from 'actions/navigation'

const Link = styled.button`
  background: transparent;
  border: none;
  text-decoration: none;
  color: ${props => props.color ? props.color(props.theme.palette) : 'inherit'};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const NavigationLink = ({ to, button, children, color }) => {
  const dispatch = useDispatch()
  const onNavigate = useCallback(() => dispatch(navigateTo(to)))

  return button ? (
    <Button onClick={onNavigate} color={color}>{children}</Button>
  ) : (
    <Link onClick={onNavigate} color={color}>{children}</Link>
  )
}

NavigationLink.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string,
  button: PropTypes.bool,
  color: PropTypes.func
}

export default NavigationLink
