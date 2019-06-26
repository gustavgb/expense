import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const TextBase = styled.span`
  font-family: ${props => props.theme.fontFamily.main};
  font-size: ${props => props.theme.fontSize[props.size || 'medium']};
  font-weight: ${props => {
    switch (props.thickness) {
      case 'bold':
        return '500'
      case 'thin':
        return '300'
      default:
        return '400'
    }
  }};
  color: ${props => props.color ? props.color(props.theme.palette) : 'inherit'};

  ${props => props.centered && css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`

const Text = ({ size, component, thickness, children, centered, color }) => (
  <TextBase
    size={size}
    as={component || 'span'}
    thickness={thickness}
    centered={centered}
    color={color}
  >
    {children}
  </TextBase>
)

Text.propTypes = {
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  component: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h6', 'p', 'span']),
  thickness: PropTypes.oneOf(['thin', 'normal', 'bold']),
  children: PropTypes.any,
  centered: PropTypes.bool,
  color: PropTypes.func
}

export default Text
