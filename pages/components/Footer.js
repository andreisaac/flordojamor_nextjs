import Link from 'next/link';
import styles from '../sass/index.module.sass';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1>Obrigado, volte sempre!</h1>
      <div><Link href="/auth" className={styles.btnGrey}>Office</Link></div>
      <div id="copyright">Copyright @ Restaurante Flor do Jamor 2020 - {new Date().getFullYear()}</div>
    </footer>
  );
};


export default Footer;
