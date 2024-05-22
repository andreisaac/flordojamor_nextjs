import {useState} from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.sass';
import NameInput from '@/components/form/NameInput';
import NumberInput from '@/components/form/NumberInput';
import CircleCross from "../images/cross-circle.svg";
import Eraser from "../images/eraser.svg";



const PratosForm = ({pratosDia, pratosCarne, pratosPeixe}) => {
  const url = process.env.URL;
  const pDia = pratosDia;
  const pCarne = pratosCarne;
  const pPeixe = pratosPeixe;

  const [pratosDiaInput, setPratosDiaInput] = useState(pDia? pDia.pratos : {});
  const [pratosCarneInput, setPratosCarneInput] = useState(pCarne ? pCarne.pratos : {});
  const [pratosPeixeInput, setPratosPeixeInput] = useState( pPeixe ? pPeixe.pratos : {});
  const [errorDia, setErrorDia] = useState({});
  const [errorCarne, setErrorCarne] = useState({});
  const [errorPeixe, setErrorPeixe] = useState({});
  const [diaLoading, setDiaLoading] = useState(false);
  const [carneLoading, setCarneLoading] = useState(false);
  const [peixeLoading, setPeixeLoading] = useState(false);

  const emptyObj = {_id: uuidv4(), name: "", price: "", price2: ""};

  const addLine = (ar, fn) => {
    if(Array.isArray(ar)) {
      fn([...ar, emptyObj]);
    }
  }

  const deleteLine = (ar, fn, index) => {
    if(Array.isArray(ar)) {
      const h = ar.slice(0, index);
      const hh = ar.slice(index+1);
      const arr = h.concat(hh);
      fn(arr);
    }
};

const cleanLine = (array, callback, index) => {
  if (Array.isArray(array) && index >= 0 && index < array.length) {
      const newArray = [...array];
      newArray[index] = emptyObj;
      callback(newArray);
  } else {
      throw new Error("Invalid array or index");
  }
}

  const submitDia = async () => {
    setDiaLoading(true);
    try {
      await fetch('/api/dia', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pratosDiaInput)})
      setDiaLoading(false)
    } catch(error) {
      setDiaLoading(false)
      setErrorDia(error)
    }
  }

  const submitCarne = async () => {
    setCarneLoading(true);
    try {
      await fetch('/api/carne', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pratosCarneInput)})
      setCarneLoading(false)
    } catch(error) {
      setCarneLoading(false)
      setErrorCarne(error)
    }
  }

  const submitPeixe = async () => {
    setPeixeLoading(true);
    try {
      await fetch('/api/peixe', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pratosPeixeInput)})
      setPeixeLoading(false)
    } catch(error) {
      setPeixeLoading(false)
      setErrorPeixe(error)
    }
  }

  return (
    <main className={styles.auth}>
      <div className={styles.office}>
        <form>
          <div className={styles.col}>
            <div className={styles.pratosDia}>
              <div className={styles.container}>
                <div>
                  <h2>Pratos do Dia</h2>
                </div>
                <div className={styles.rowPadding}>
                  <div className={styles.name}>Nome</div>
                  <div className={styles.hdose}>1/2 Dose</div>
                  <div className={styles.dose}>1 Dose</div>
                </div>

                {Array.isArray(pratosDiaInput) ? pratosDiaInput.map((item,index,arr) => (
                  <div className={styles.inputRow} key={item._id}>
                    <div className={styles.nameInp}>
                      <NameInput index={index} menu="dia" defaultValue={item.name} name="name" placeholder="Polvo à..." data={pratosDiaInput} error={errorDia} inputUpdate={setPratosDiaInput} errorUpdate={setErrorDia}/>
                    </div>
                    <div className={styles.priceInp}>
                      <NumberInput index={index} menu="dia" defaultValue={item.price} name="price" placeholder="7.5" data={pratosDiaInput} error={errorDia} inputUpdate={setPratosDiaInput} errorUpdate={setErrorDia}/>
                    </div>
                    <div className={styles.price2Inp}>
                      <NumberInput index={index} menu="dia" defaultValue={item.price2||""} name="price2" placeholder="13" data={pratosDiaInput||""} error={errorDia} inputUpdate={setPratosDiaInput} errorUpdate={setErrorDia}/>
                    </div>
                    <div className={styles.func}>
                      <a  onClick={() => cleanLine(pratosDiaInput, setPratosDiaInput, index)} className={styles.clean}><Image src={Eraser} width={26} height={26} alt="svg logo"/></a>
                      <a  onClick={()=> deleteLine(pratosDiaInput, setPratosDiaInput, index)} className={styles.del}><Image src={CircleCross} width={26} height={26} alt="svg logo"/></a>
                    </div>
                  </div>
                )) : null}

                <a className={styles.addLine} onClick={() => addLine(pratosDiaInput, setPratosDiaInput)}><i className="fa fa-plus"/> Adicionar Linha</a>
                {!diaLoading ?
                  <a className={styles.submitInput} disabled={diaLoading} onClick={() => submitDia()}><i className="fa fa-check"/> Submeter Menu</a>
                  :
                  <span className={styles.loaderInput}><i className="fa-solid fa-spinner fa-spin"></i></span>
                }
              </div>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.pratosCarne}>
              <div className={styles.container}>
                <div>
                  <h2>Pratos de Carne</h2>
                </div>

                <div className={styles.rowPadding}>
                  <div className={styles.name}>Nome</div>
                  <div className={styles.hdose}>1/2 Dose</div>
                  <div className={styles.dose}>1 Dose</div>
                </div>
                {Array.isArray(pratosCarneInput) ? pratosCarneInput.map((item,index,arr) => (
                  <div className={styles.inputRow} key={item._id}>
                    <div className={styles.nameInp}>
                      <NameInput index={index} menu="carne" defaultValue={item.name} name="name" placeholder="Polvo à..." data={pratosCarneInput} error={errorCarne} inputUpdate={setPratosCarneInput} errorUpdate={setErrorCarne}/>
                    </div>
                    <div className={styles.priceInp}>
                      <NumberInput index={index} menu="carne" defaultValue={item.price} name="price" placeholder="7.5" data={pratosCarneInput} error={errorCarne} inputUpdate={setPratosCarneInput} errorUpdate={setErrorCarne}/>
                    </div>
                    <div className={styles.price2Inp}>
                      <NumberInput index={index} menu="carne" defaultValue={item.price2||""} name="price2" placeholder="13" data={pratosCarneInput||""} error={errorCarne} inputUpdate={setPratosCarneInput} errorUpdate={setErrorCarne}/>
                    </div>
                    <div className={styles.func}>
                    <a  onClick={() => cleanLine(pratosCarneInput, setPratosCarneInput, index)} className={styles.clean}><Image src={Eraser} width={26} height={26} alt="svg logo"/></a>
                      <a  onClick={()=> deleteLine(pratosCarneInput, setPratosCarneInput, index)} className={styles.del}><Image src={CircleCross} width={26} height={26} alt="svg logo"/></a>
                    </div>
                  </div>
                )) : null}

                <a className={styles.addLine} onClick={() => addLine(pratosCarneInput, setPratosCarneInput)}><i className="fa fa-plus"/> Adicionar Linha</a>
                {!carneLoading ?
                  <a className={styles.submitInput} disabled={carneLoading} onClick={() => submitCarne()}><i className="fa fa-check"/> Submeter Menu</a>
                  :
                  <span className={styles.loaderInput}><i className="fa-solid fa-spinner fa-spin"></i></span>
                }
              </div>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.pratosPeixe}>
              <div className={styles.container}>
                <div>
                  <h2>Pratos de Peixe</h2>
                </div>

                <div className={styles.rowPadding}>
                  <div className={styles.name}>Nome</div>
                  <div className={styles.hdose}>1/2 Dose</div>
                  <div className={styles.dose}>1 Dose</div>
                </div>
                {Array.isArray(pratosPeixeInput) ? pratosPeixeInput.map((item,index,arr) => (
                  <div className={styles.inputRow} key={item._id}>
                    <div className={styles.nameInp}>
                      <NameInput index={index} menu="peixe" defaultValue={item.name} name="name" placeholder="Polvo à..." data={pratosPeixeInput} error={errorPeixe} inputUpdate={setPratosPeixeInput} errorUpdate={setErrorPeixe}/>
                    </div>
                    <div className={styles.priceInp}>
                      <NumberInput index={index} menu="peixe" defaultValue={item.price} name="price" placeholder="7.5" data={pratosPeixeInput} error={errorPeixe} inputUpdate={setPratosPeixeInput} errorUpdate={setErrorPeixe}/>
                    </div>
                    <div className={styles.price2Inp}>
                      <NumberInput index={index} menu="peixe" defaultValue={item.price2||""} name="price2" placeholder="13" data={pratosPeixeInput||""} error={errorPeixe} inputUpdate={setPratosPeixeInput} errorUpdate={setErrorPeixe}/>
                    </div>
                    <div className={styles.func}>
                      <a  onClick={() => cleanLine(pratosPeixeInput, setPratosPeixeInput, index)} className={styles.clean}><Image src={Eraser} width={26} height={26} alt="svg logo"/></a>
                      <a  onClick={()=> deleteLine(pratosPeixeInput, setPratosPeixeInput, index)} className={styles.del}><Image src={CircleCross} width={26} height={26} alt="svg logo"/></a>
                    </div>
                  </div>
                )) : null}

                <a className={styles.addLine} onClick={() => addLine(pratosPeixeInput, setPratosPeixeInput)}><i className="fa fa-plus"/> Adicionar Linha</a>
                {!peixeLoading ?
                  <a className={styles.submitInput} disabled={peixeLoading} onClick={() => submitPeixe()}><i className="fa fa-check"/> Submeter Menu</a>
                  :
                  <span className={styles.loaderInput}><i className="fa-solid fa-spinner fa-spin"></i></span>
                }
              </div>
            </div>
          </div>

        </form>
      </div>
    </main>
  )
};
export default PratosForm;