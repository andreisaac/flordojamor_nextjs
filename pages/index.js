import Image from 'next/image'
import Layout from './layout'
import styles from './index.module.sass'
import { connectToDatabase } from './util/mongodb'


export default function Menu({pratosDia, pratosCarne, pratosPeixe}) {
  const pDia = JSON.parse(pratosDia);
  const pCarne = JSON.parse(pratosCarne);
  const pPeixe = JSON.parse(pratosPeixe);

  const date = new Date(pDia[0].date);
  const formatedDate = (d) => {
    return d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear()
  }
  return (
    <Layout>
      <div className={styles.menu}>
        <div className={styles.rowPadding}>
          <div className={styles.colL4}>
            <div className={styles.pratosDia}>
              <h2 id="pratosDia">Pratos do Dia:</h2>
                {pDia ? (
                  <div>
                    <p className={styles.date}> {formatedDate(date)}</p>
                    <table className={styles.table}>
                      <tbody>
                        {typeof pDia[0].pratos == "object" ? pDia[0].pratos.map((item,index) => (
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

          <div className={styles.colL4}>
            <div className={styles.pratosCarne}>
              <h2>Pratos de Carne:</h2>
                  {!pCarne ?
                    <div>
                      <img className={style.loader} src="images/loader.gif"/>
                    </div>
                    :
                    typeof pCarne[0].pratos == "object" ?
                    <table className={styles.table}>
                      <tbody>
                        {pCarne[0].pratos.map((item,index) => (
                              <tr key={index} className={item.over ? styles.overMenu : ""}>
                                <td id="menuName">{item.name}</td>
                                <td id="menuPrice">{item.price.toFixed(2)} €{item.price2 && item.price2 !== null ? " / " + (item.price2.toFixed(2)) +"€": ""}</td>
                              </tr>))}
                        </tbody>
                      </table> : null}
            </div>
      		</div>

          <div className={styles.colL4}>
            <div className={styles.pratosPeixe}>
        			<h2>Pratos de Peixe:</h2>
                  {!pPeixe[0]?
                    <div>
                      <img className={styles.loader} src="images/loader.gif"/>
                    </div>
                    :
                    typeof pPeixe[0].pratos == "object" ?
                      <table className={styles.table}>
                        <tbody>
                          {pPeixe[0].pratos.map((item,index) => (
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


export async function getStaticProps(context) {
  const { db } = await connectToDatabase()

  const pDia = await db.collection('pratosdias').find({}).toArray();
  const pCarne = await db.collection('pratoscarnes').find({}).toArray();
  const pPeixe = await db.collection('pratospeixes').find({}).toArray();

  const pratosDia = JSON.stringify(pDia);
  const pratosCarne = JSON.stringify(pCarne);
  const pratosPeixe = JSON.stringify(pPeixe);

  return {
    props: { pratosDia, pratosCarne, pratosPeixe },
  }
}
