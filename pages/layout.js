import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import styles from './index.module.sass'
import Image from 'next/image'
import Head from 'next/head'
import background from './images/background.jpg'
import Weelytical from 'weelytical-react'
export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content='_tnQwCfLDBSdbJjC815smG7yDFfnXp_dNcXjNXqg_As'/>
      </Head>
      <div className={styles.body} lang="pt-PT">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Weelytical/>
        <Navbar/>
        {background ? 
          <Image className={styles.background} src={background} alt="Picture of the background" sizes="100vw" priority/>
          : ""}
        <div>
          {children}
        </div>
        <Footer/>
      </div>
    </>
  )
}
