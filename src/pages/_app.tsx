import LayoutMain from '../layout/layout.main';
import {ThemeProvider} from '@material-ui/styles';
import theme from '../theme/defaultTheme';
import { CssBaseline } from '@material-ui/core';

function App({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutMain hGutter={true}>
        <Component {...pageProps} />
      </LayoutMain> 
    </ThemeProvider>
  )
}

export default App
