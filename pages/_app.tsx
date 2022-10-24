import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav'
import Qr from '../components/Qr'
import Row from '../components/Row'

function MyApp({ Component, pageProps }: AppProps) {
  return <main className=''>
    <Nav/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Component {...pageProps} />
  </main>
}

export default MyApp
