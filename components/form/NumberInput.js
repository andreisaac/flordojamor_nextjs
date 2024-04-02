'use strict';
import  React, {useState, useEffect} from 'react';
import styles from "../index.module.sass"

//props => name(property-name), defaultValue(defaultValue), data(formData.name), error(formError.name), errorUpdate(method), inputUpdate(method)
const NumberInput = (props) => {
  const [value, setValue] = useState(props.defaultValue);

  const onBlur = () => {
    const val = event.target.value;
    if(value !== "") {
      setValue(parseFloat(val).toFixed(2));
      props.inputUpdate(Object.assign(props.data, {[props.name]: parseFloat(value).toFixed(2)}));
    }
  };

  const handleInput = (event) => {
    const val = event.target.value;
    const name = event.target.name;
    let arr = [...props.data];
    arr[props.index][props.name] = parseFloat(val)
    val !== "" ?
        val < 100 ?
          props.errorUpdate(Object.assign(props.error, {[props.index]: false})) :
          props.errorUpdate(Object.assign(props.error, {[props.index]: "Entre 4 a 40 caracteres."}))
      : "";
    props.inputUpdate(arr);
    setValue(val);
  };

  return (

    <div className={styles.inputComponent}>
      <input type="number" name={props.name} value={value||""} placeholder={props.placeholder||"Numero"} onChange={handleInput} onBlur={onBlur} className={props.error && props.error[props.name] ? "error" : props.data ? "success" : "" }/>

      {props.data && props.error ?
        (<div className={props.error && props.error[props.name] ? styles.checkerError : styles.checkerSuccess } >
          {props.error && props.error[props.name] ? <i className="fa fa-times"/> : <i className="fa fa-check"/> }
        </div>) : ""}
      {props.error && props.error[props.name] ?
        (<div className={styles.inputErrorAlert}>Ex: 13,50</div>) : null}

    </div>

  );

};

export default NumberInput;
