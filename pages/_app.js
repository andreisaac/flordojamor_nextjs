import AppProps from 'next/app'
import'./globals.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
