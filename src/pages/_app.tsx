import App from 'next/app';
import React from 'react';
import {appWithTranslation} from '../../nexti18n';
import LayoutMain from '../layout/layout.main/layout.main';
import {ThemeProvider} from '@material-ui/styles';
import theme from '../theme/defaultTheme';
import { CssBaseline} from '@material-ui/core';
import LayoutPage from '../layout/layout.page/layout.page';
import Navigation from '../components/navigation/navigation.comp';

function TriplanedApp({ Component, pageProps }) {
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutMain hGutter={true}>
        <LayoutPage header={<Navigation />}>
          <Component {...pageProps} />
        </LayoutPage>
      </LayoutMain> 
    </ThemeProvider>
  )
}

TriplanedApp.getInitialProps = async (appContext) => ({
   ...await App.getInitialProps(appContext),
})

export default appWithTranslation(TriplanedApp);
