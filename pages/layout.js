import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import styles from './index.module.sass'
import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import background from './images/background.jpg'

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <html lang="pt-PT"/>
      </Head>
      <div className={styles.body}>
        <Script src="https://kit.fontawesome.com/5b691653ea.js" crossOrigin="anonymous"></Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Navbar/>
        <Image className={styles.background} src={background} alt="Picture of the background" sizes="100vw" priority={true}/>
        <div>
          {children}
        </div>
        <Footer/>
      </div>
    </>
  )
}
