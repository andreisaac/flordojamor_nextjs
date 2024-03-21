import styles from '../index.module.sass';
import {useState} from 'react';

const EmailInput = props => {
  const {email, setEmail} = useState();
  const {error, setError} = useState(false);

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    value.match(reg) ?
      props.errorUpdate(false) :
      props.errorUpdate("Ex: patuscos@mail.com");
    props.inputUpdate(value);
  }

  return (
    <div>
      {props.label ? <label className={styles.labelInput}>{props.label}</label> : ""}
      <div className={styles.inputComponent}>
        <input type="email" id="email" name={props.name} placeholder={props.placeholder || "email@email.com"} value={props.value} onChange={handleInput} className={props.error ? "error" : props.value ? "success" : ""} autoComplete="username"/>
        {props.value ?
          (<div className={props.error ? styles.checkerError : styles.checkerSuccess }>
            {props.error ? <i className="fa fa-times"/> : <i className="fa fa-check"/> }
          </div>)
        : null}
      </div>
      {props.error ?
        <div className="input-error-alert">{props.error}</div> : null }
    </div>
  )
};

export default EmailInput;
