import Image from 'next/image';
import Head from 'next/head';
import Layout from './layout';
import styles from './index.module.sass';
import {useRouter} from "next/router";
import connectToDatabase from '@/util/mongoosedb'
import PDia from "@/models/dia";
import PCarne from "@/models/carne";
import PPeixe from "@/models/peixe";
import h2Back from "./images/background-tittle.jpg";
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Menu',
  description: 'Nesta página pode consultar o menu do dia do Restaurante Flor do Jamor, em baixo tem os contatos telefónicos assim como a morada. Pratos do dia atualizados diáriamente por volta das 10h30.',
}

const Menu = ({pratosDia, pratosCarne, pratosPeixe}) => {
  
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const pDia = JSON.parse(pratosDia);
  const pCarne = JSON.parse(pratosCarne);
  const pPeixe = JSON.parse(pratosPeixe);
 
  let date = '';

  if(pDia && pDia.date){
    const d = new Date().getDate();
    const pd = new Date(pDia.date).getDate();
    if(d === pd) {
      date = new Date(pDia.date);
    }
  }

  const pad = function (d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
 
  const formatedDate = (d) => {
    if(d instanceof Date) {
      return pad(d.getDate()) + '-' + pad((d.getMonth()+1)) + '-' + d.getFullYear()
    }
  }

  return (
    <Layout>
      <Head>
        <title>Menu</title>
      </Head>
      <div className={styles.menu}>
        <div className={styles.rowPadding}>
          <div className={styles.divisions}>
            <div className={styles.pratosDia}>
              <h2 id="pratosDia">
                <Image src={h2Back} alt="Background do titulo" className={styles.h2Back}  loading='lazy'/>
                <span>Pratos do Dia:</span>
                </h2>
                {pDia && pDia.date && date ? (
                  <div>
                    <p className={styles.date}> { formatedDate(date) }</p>
                    <table className={styles.table}>
                      <tbody>
                        {pDia && typeof Array.isArray(pDia.pratos) ? pDia.pratos.map((item,index) => (
                          <tr key={index} className={item.over ? styles.overMenu : ""}>
                            <td id="menuName">{item.name}</td>
                            <td id="menuPrice">{item.price ? item.price.toFixed(2) : ""} € {item.price2 && item.price2 !== null ? " / " + (item.price2.toFixed(2)) +"€": ""}</td>
                          </tr>)) : ""}
                      </tbody>
                    </table>
                  </div>
                )
                  : (
                  <div className={styles.emptyMenu}>
                    <p>Ainda não foram adicionados os pratos do dia de hoje.</p>
                    <p>Geralmente são actualizados entre as 10h~11h.</p>
                    <p>Agradecemos a compreensão, Obrigado!</p>
                  </div>
                )}

                <br/>

                <div className={styles.contacts}>
                <h2>Contactos:</h2>
                  <br/>
                  <div>
                    <p><a href="tel: +351214184742">214 184 742</a></p>
                  </div>
                  <div>
                      <p><a href="tel: +351925333652">925 333 652</a></p>
                  </div>
                </div>
            </div>
          </div>

          <div className={styles.divisions}>
            <div className={styles.pratosCarne}>
              <h2>
                <Image src={h2Back} alt="Background do titulo" className={styles.h2Back}  loading='lazy'/>
                <span>Pratos de Carne:</span>
              </h2>
                  {!pCarne ?
                    <div>
                      <Image alt="loader" className={styles.loader} src="images/loader.gif"/>
                    </div>
                    :
                    pCarne && typeof pCarne.pratos == "object" ?
                    <table className={styles.table}>
                      <tbody>
                        {pCarne.pratos.map((item,index) => (
                              <tr key={index} className={item.over ? styles.overMenu : ""}>
                                <td id="menuName">{item.name}</td>
                                <td id="menuPrice">{item.price.toFixed(2)} €{item.price2 && item.price2 !== null ? " / " + (item.price2.toFixed(2)) +"€": ""}</td>
                              </tr>))}
                        </tbody>
                      </table> : null}
            </div>
      		</div>

          <div className={styles.divisions}>
            <div className={styles.pratosPeixe}>
        			<h2>
                <Image src={h2Back} alt="Background do titulo" className={styles.h2Back}  loading='lazy'/>
                <span>Pratos do Peixe:</span>
              </h2>
                  {!pPeixe?
                    <div>
                      <Image alt="loader" className={styles.loader} src="images/loader.gif"/>
                    </div>
                    :
                    pPeixe && typeof pPeixe.pratos == "object" ?
                      <table className={styles.table}>
                        <tbody>
                          {pPeixe.pratos.map((item,index) => (
                          <tr key={index} className={item.over ? styles.overMenu : ""}>
                            <td id="menuName">{item.name}</td>
                            <td id="menuPrice">{item.price.toFixed(2)} €{item.price2 && item.price2 !== null ? " / " + (item.price2.toFixed(2)) +"€": ""}</td>
                          </tr>))}
                        </tbody>
                      </table>
                    : null}
            </div>
      		</div>

          <div className={styles.row}>
        		<div className={styles.alertInfo}>
        			<strong>Info!</strong> Os pratos do dia são actualizados entre as 10h~11h.
        		</div>
        		<div className={styles.alertInfo}>
        			<strong>Info!</strong> As caixas têm um custo de 0.50€ e os sacos de 0.20€.
        		</div>
        	</div>


        </div>
      </div>
    </Layout>
  )
};

export default Menu;

export async function getStaticProps(context) {
  
  const db = await connectToDatabase();
  const dia = await PDia.find({});
  const carne = await PCarne.find({});
  const peixe = await PPeixe.find({});

  const pratosDia = JSON.stringify(dia[0]);
  const pratosCarne = JSON.stringify(carne[0]);
  const pratosPeixe = JSON.stringify(peixe[0]);

  return {
    props: { pratosDia, pratosCarne, pratosPeixe },
  }
}

