'use strict';
import React from 'react';
//props => name(property-name), labelInput(String), defaultValue(defaultValue), data(formData.name), error(formError.name), errorUpdate(method), inputUpdate(method), removeData(boolean)
export default class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.removeData = this.removeData.bind(this);
    this.state = {value: ""};
  }

  static getDerivedStateFromProps(props,state){
    if(!state.value) {
      if(props.defaultValue !== state.value){
        return {value: props.defaultValue};
      }else {
        return null
      }
    } else if(state.value !== props.data) {
      return {value: props.data}
    } else {return null}

  }

  removeData() {
    this.setState({value: ""});
    this.props.inputUpdate(null, this.props.index, this.props.menu);
  }

  handleInput(event) {
    const value = event.target.value;
    const name = event.target.name;
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    value.match(reg) ?
      this.props.errorUpdate({[name]: false}) :
      this.props.errorUpdate({[name]: "Entre 4 a 40 caracteres."});
    this.props.inputUpdate({[name]: value});
  }

  render() {
    return (
      <div>
        {this.props.label ? <label className="label-input">{this.props.label}</label> : ""}
        {this.props.removeData ? <a className="remove-data" onClick={() => this.removeData()}><i className="fa fa-times"/></a> : ""}
        <div className="input-component">
          <input type="password" name={this.props.name} value={this.props.value} onChange={this.handleInput}  className={this.props.error ? "error" : this.props.data ? "success" : ""} autocomplete="current-password"/>
          {this.props.data ?
            (<div className={this.props.error ? "checker-error" : "checker-success" }>
              {this.props.error ? <i className="fa fa-times"/> : <i className="fa fa-check"/> }
              </div>)
          : "" }
        </div>
        {this.props.error ?
          (<div className="input-error-alert">{this.props.error}</div>) : ""}
      </div>
    );
  }
}
