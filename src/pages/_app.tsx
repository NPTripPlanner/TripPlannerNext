import LayoutMain from '../layout/layout.main/layout.main';
import {ThemeProvider} from '@material-ui/styles';
import theme from '../theme/defaultTheme';
import { CssBaseline, Link, SvgIcon, Box, Toolbar, Typography } from '@material-ui/core';
import LayoutPage from '../layout/layout.page/layout.page';
import Navbar from '../components/navbar/navbar.comp';
import Brand from '../assets/header/pin.svg';
import MulticolorText from '../components/multicolor.text/multicolor.text.comp';

const navbar = ()=>{
  const options = [
    <Link component="button">
      <Typography variant='h6'>Explore</Typography>
    </Link>,
    <Link component="button">
      <Typography variant='h6'>Feature</Typography>
    </Link>

  ];
  return (
      <Box>
        <Navbar 
        color='primary'
        shadowEl={0}
        brandIcon={
          <SvgIcon aria-hidden={true} fontSize='large'>
            <Brand />
          </SvgIcon>
        }
        title={
          <MulticolorText
          prefix='TRI'
          prefixColor='info.light'
          prefixVariant='h4'
          text='PLANED'
          textVariant='h4'
          textFontWeight={600} 
          />
        }
        hGutter={3}
        options={options}
        />
        <Toolbar />
      </Box>
  )
}
function App({ Component, pageProps }) {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutMain hGutter={true}>
        <LayoutPage header={navbar()}>
          <Component {...pageProps} />
        </LayoutPage>
      </LayoutMain> 
    </ThemeProvider>
  )
}

export default App
