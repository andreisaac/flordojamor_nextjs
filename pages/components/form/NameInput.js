'use strict';
import  React, {useState, useEffect} from 'react';
import styles from "../index.module.sass"
//props => name(property-name), labelInput(String), defaultValue(defaultValue), data(formData.name), error(formError.name), errorUpdate(method), inputUpdate(method), removeData(boolean)

const NameInput = (props) => {
  const [value, setValue] = useState("");

  useEffect(()=>{
    setValue(props.defaultValue)
  },[props.data])

  const handleInput = (event) => {
    const val = event.target.value;
    const name = event.target.name;
    const reg = /^[\w\s\u00C0-\u017F\/]{4,40}$/g;
    let arr = [...props.data];
    arr[props.name].name = val
    val.match(reg) ?
      props.errorUpdate(Object.assign(props.error, {[props.name]: false})) :
      props.errorUpdate(Object.assign(props.error, {[props.name]: "Entre 4 a 40 caracteres."}));
    props.inputUpdate(arr);
    setValue(val);
  };

  const removeData = () => {
    setValue("")
    props.inputUpdate(Object.assign(props.data, {[props.name]: ""}));
    props.errorUpdate(Object.assign(props.error, {[props.name]: false}));
  }
  return (
    <div>
      <div className={styles.inputComponent}>
        <input type="text" name={props.name} value={value} placeholder={props.placeholder||"Insira o nome..."} onChange={handleInput}  className={props.error && props.error[props.name] ? "error" : props.data ? "success" : ""}/>
        {props.data && props.data[props.name] ?
          (<div className={props.error && props.error[props.name] ? styles.checkerError : styles.checkerSuccess }>
            {props.error && props.error[props.name] ? <i className="fa fa-times"/> : <i className="fa fa-check"/> }
            </div>)
        : "" }
      </div>
      {props.error && props.error[props.name] ?
        (<div className={styles.inputErrorAlert}>{props.error[props.name]}</div>) : ""}
    </div>
  );
};

export default NameInput;
