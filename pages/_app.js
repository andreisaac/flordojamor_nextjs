import AppProps from 'next/app'
import './default.css'


export default function MyApp({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
          <Component {...pageProps} />
        )
}
