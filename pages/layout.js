import Navbar from './components/Navbar'
import Footer from './components/Footer'
import styles from './index.module.sass'

export default function RootLayout({ children }) {
  return (

      <div className={styles.body}>
        <Navbar/>
        <div>
          {children}
        </div>
        <Footer/>
      </div>
  )
}
