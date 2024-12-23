import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import Layout from '../layout'
import styles from './index.module.sass'
import h2Back from "../images/background-tittle.jpg";

export const metadata = {
  title: 'Contatos',
  description: 'Nesta página pode consultar os contatos telefónicos, bem como a nossa localização pelo google maps. Também tem a nossa página de facebook.',
}

export default function Contatos() {
  return (
    <>
      <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v6.0&appId=819476981525422&autoLogAppEvents=1"></Script>
      <Head>
        <title>Contatos</title>
        <meta name="description" content='Contatos telefónicos, e localização via google maps.'/>
      </Head>
      <Layout>
        <div className={styles.contacts}>

          <div className={styles.cols6m6l4}>
            <h2>
              <Image src={h2Back} alt="Background do titulo" className={styles.h2Back} priority={true}/>
              <span>Morada:</span>
            </h2>
            <p>R. Cesário Verde 41 F,<br/>
            2790-468 Queijas
          </p></div>
          <div className={styles.cols6m6l4}>
            <h2>
              <Image src={h2Back} alt="Background do titulo" className={styles.h2Back} priority={true}/>
              <span>Telefone:</span>
            </h2>
              <p><a href="tel: +351214184742">214 184 742</a></p>
              <p><a href="tel: +351925333652">925 333 652</a></p>
          </div>
          <div className={styles.colL4}>
            <h2>
              <Image src={h2Back} alt="Background do titulo" className={styles.h2Back} priority={true}/>
              <span>Horário:</span>
            </h2>
            <p>De segunda-feira a sexta-feira.<br/>
            Almoços entre as 12:00h e 15:00h.<br/>
            Jantares entre as 19:00h e 21:45h.<br/>
          Sábado aos almoços entre as 12:00h e 15:00h.
            </p>
          </div>
          <div className={styles.map}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.903433479999!2d-9.254101999999994!3d38.72002600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ecc6d433de187%3A0x476f70cbab95d339!2sCervejaria+Caf%C3%A9+Flor+Jamor!5e0!3m2!1spt-PT!2spt!4v1432409740985" frameBorder="0"></iframe>
          </div>

          <div className={styles.social}>
            <div id="fb-root"></div>
            <div className="fb-page" data-href="https://www.facebook.com/restauranteflordojamor/" data-tabs="timeline" data-width="1080" data-height="610" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <blockquote cite="https://www.facebook.com/restauranteflordojamor/" className="fb-xfbml-parse-ignore">
                <a className="link para face" href="https://www.facebook.com/restauranteflordojamor/">Restaurante Flor do Jamor</a>
              </blockquote>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
