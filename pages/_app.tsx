import { StaticKitProvider } from '@statickit/react'

import '../styles.css'

function App ({ Component, pageProps }) {
  return (
    <StaticKitProvider site="54e274d4bc01">
      <Component {...pageProps} />
    </StaticKitProvider>
  )
}

export default App
