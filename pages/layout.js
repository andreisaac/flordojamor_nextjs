import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import styles from './index.module.sass'
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
      <div className={styles.body}>
        <Script src="https://kit.fontawesome.com/5b691653ea.js" crossOrigin="anonymous"></Script>
        <Navbar/>
        <div>
          {children}
        </div>
        <Footer/>
      </div>
  )
}
