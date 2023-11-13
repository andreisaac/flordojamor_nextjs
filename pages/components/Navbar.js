'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {useState} from 'react';
import styles from './index.module.sass'

const Navbar = props => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    setNav(!nav)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.largeScreen}>
          <Link href="/" className={pathname == "/" ? styles.active : ""}>Menu</Link >
          <Link href="/contatos" className={pathname == "/contatos" ? styles.active : ""}>Contatos</Link>
        </div>
        <div className={styles.smallSreen}>
          <a className={styles.bar} onClick={toggleNav}>&#9776;</a>
          {nav ? (
            <div className={styles.links}>
              <Link href="/" onClick={toggleNav}>Menu</Link >
              <Link href="/contatos" onClick={toggleNav}>Contactos</Link >
            </div> ) : (
              <a href="/" className={styles.title}>Restaurante Flor do Jamor</a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
