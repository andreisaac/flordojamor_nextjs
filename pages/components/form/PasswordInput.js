import styles from '../index.module.sass';

//props => name(property-name), labelInput(String), defaultValue(defaultValue), data(formData.name), error(formError.name), errorUpdate(method), inputUpdate(method), removeData(boolean)

const PasswordInput = props => {

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    value.match(reg) ?
      props.errorUpdate(false) :
      props.errorUpdate("Entre 4 a 40 caracteres.");
    props.inputUpdate(value);
  };

  return (
    <div>
      {props.label ? <label className={styles.labelInput}>{props.label}</label> : ""}
      <div className={styles.inputComponent}>
        <input type="password" name={props.name} value={props.value} onChange={handleInput}  className={props.error ? "error" : props.data ? "success" : ""} autoComplete="current-password"/>
        {props.value ?
          (<div className={props.error ? styles.checkerError : styles.checkerSuccess }>
            {props.error ? <i className="fa fa-times"/> : <i className="fa fa-check"/> }
            </div>)
        : "" }
      </div>
      {props.error ?
        (<div className={styles.inputErrorAlert}>{props.error}</div>) : ""}
    </div>
  );

};

export default PasswordInput;
