import styled from 'styled-components'

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.hasOverflowX ? 'flex-start' : 'center'};

  overflow: auto;

  @media (max-width: 300px) {
    align-items: flex-start;
  }
`

export default ScrollContainer
