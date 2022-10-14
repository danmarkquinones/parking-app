import '../styles/globals.css'
import 'rsuite/dist/rsuite.min.css';
import type { AppProps } from 'next/app'
import {UserWrapper} from './shared/userContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserWrapper>
      <Component {...pageProps} />
    </UserWrapper>
  )
}

export default MyApp
