import { styled } from '@material-ui/styles'

const Centered = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'none',
  height: '100vh',
  paddingBottom: theme.spacing(3)
}))

export default Centered
