import Link from 'next/link';
import styles from './index.module.sass';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1>Obrigado, volte sempre!</h1>
      <div><Link href="/signin" className={styles.btnGrey}>Office</Link></div>
      <div className={styles.copyright}>Copyright @ Restaurante Flor do Jamor {new Date().getFullYear()}</div>
    </footer>
  );
};


export default Footer;
