import { styled } from '@material-ui/styles'

const Centered = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'none',
  height: '100vh',
  width: '100%',
  paddingBottom: theme.spacing(3)
}))

export default Centered
