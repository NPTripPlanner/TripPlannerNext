import LayoutMain from '../layout/layout.main';

function App({ Component, pageProps }) {

  return (
    <LayoutMain>
      <Component {...pageProps} />
    </LayoutMain> 
  )
}

export default App
