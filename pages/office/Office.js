'use strict';

import React from 'react';
//redux connect
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import NameInput from '../components/form/NameInput'
import NumberInput from '../components/form/NumberInput'
import {getDia, postDia, updateDia, getCarne, postCarne, updateCarne, getPeixe, postPeixe, updatePeixe, errorUpdate} from '../actions/index'


function mapStateToProps(state) {
    // the state is from store.getState()
    // example will pass a todos prop to the connected component
    // so if you want all the state in this component use the spread operator
    return {
        pratosDia: state.pratosDia,
        pratosCarne: state.pratosCarne,
        pratosPeixe: state.pratosPeixe,
        formDia: state.formDia,
        formCarne: state.formCarne,
        formPeixe: state.formPeixe,
        formError: state.formError
    }
}


function mapDispatchToProps(dispatch) {
    // bindActionCreators will wrap all the function in the passed in object
    // with the dispatch function so that the actionCreators can be called
    // directly; withover dispatch eg this.props.addTodo(sometodo)
    return bindActionCreators({ getDia, postDia, updateDia, getCarne, postCarne, updateCarne, getPeixe, postPeixe, updatePeixe, errorUpdate }, dispatch);
}

const d = new Date();
const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
const td = new Date();
const tdate = new Date(td.getFullYear(), td.getMonth(), td.getDate());
tdate.setDate(tdate.getDate() + 1);

class Office extends React.Component {
  constructor(props) {
    super(props);
    this.today = this.today.bind(this);
    this.tomorrow = this.tomorrow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.over = this.over.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.updateDiaN = this.updateDiaN.bind(this);
    this.updateDiaP = this.updateDiaP.bind(this);
    this.updateDiaP2 = this.updateDiaP2.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {today: true}
  }
  today() {
    let obj = Object.assign({}, this.props.formDia, {date: date});
    this.setState({today: true});
    this.props.updateDia(obj);
  }

  componentDidMount() {
    this.today();
  }

  tomorrow() {
    let obj = Object.assign({}, this.props.formDia, {date: tdate});
    this.setState({today: false});
    this.props.updateDia(obj);
  }

  updateDiaN(data,index, menu) {
      if(menu === "dia") {
        let obj = Object.assign({}, this.props.formDia);
        obj.pratos[index].name = data;
        this.props.updateDia(obj);
      } else if (menu === "carne") {
        let obj = Object.assign({}, this.props.formCarne);
        obj.pratos[index].name = data;
        this.props.updateCarne(obj);
      } else if (menu === "peixe") {
        let obj = Object.assign({}, this.props.formPeixe);
        obj.pratos[index].name = data;
        this.props.updatePeixe(obj);
      }
  }
  updateDiaP(data,index, menu) {
      if(menu === "dia") {
        let obj = Object.assign({}, this.props.formDia);
        obj.pratos[index].price = data;
        this.props.updateDia(obj);
      } else if (menu === "carne") {
        let obj = Object.assign({}, this.props.formCarne);
        obj.pratos[index].price = data;
        this.props.updateCarne(obj);
      } else if (menu === "peixe") {
        let obj = Object.assign({}, this.props.formPeixe);
        obj.pratos[index].price = data;
        this.props.updatePeixe(obj);
      }
  }
  updateDiaP2(data,index, menu) {
      if(menu === "dia") {
        let obj = Object.assign({}, this.props.formDia);
        obj.pratos[index].price2 = data;
        this.props.updateDia(obj);
      } else if (menu === "carne") {
        let obj = Object.assign({}, this.props.formCarne);
        obj.pratos[index].price2 = data;
        this.props.updateCarne(obj);
      } else if (menu === "peixe") {
        let obj = Object.assign({}, this.props.formPeixe);
        obj.pratos[index].price2 = data;
        this.props.updatePeixe(obj);
      }
  }

  addRow(menu) {
    if(menu === "dia") {
      if(!this.props.formDia.pratos) {
        const obj = {pratos:[], date: date};
        obj.pratos.push({name:"", price:"", price2: ""});
        this.props.updateDia(obj);
      } else {
        const obj = Object.assign({}, this.props.formDia);
        obj.pratos.push({name:"", price:"", price2: ""});
        this.props.updateDia(obj);
      }

    } else if (menu === "carne") {
      if(!this.props.formCarne.pratos) {
        const obj = {pratos:[], date: date};
        obj.pratos.push({name:"", price:"", price2: ""});
        this.props.updateCarne(obj);
      } else {
        const obj = Object.assign({}, this.props.formCarne);
        obj.pratos.push({name:"", price:"", price2: ""});
        this.props.updateCarne(obj);
      }
    } else if (menu === "peixe") {
      if(!this.props.formPeixe.pratos) {
         const obj = { pratos:[], date: date};
         obj.pratos.push({name:"", price:"", price2: ""});
         this.props.updatePeixe(obj);
       } else {
         const obj = Object.assign({}, this.props.formPeixe);
         obj.pratos.push({name:"", price:"", price2: ""});
         this.props.updatePeixe(obj);
       }

    }
  }

  over(i, menu) {
    const {formDia, formCarne, formPeixe, updateDia, updateCarne, updatePeixe} = this.props;

    if(menu === "dia") {
      const obj = Object.assign({}, formDia);
      obj.pratos[i].over = !formDia.pratos[i].over;
      updateDia(obj);
    } else if (menu === "carne") {
      const obj = Object.assign({}, formCarne);
      obj.pratos[i].over = !formDia.pratos[i].over;
      updateCarne(obj);
    } else if (menu === "peixe") {
      const obj = Object.assign({}, formPeixe);
      obj.pratos[i].over = !formDia.pratos[i].over;
      updatePeixe(obj);
    }

  }

  removeRow(i, menu) {
    const {formDia, formCarne, formPeixe, updateDia, updateCarne, updatePeixe, errorUpdate} = this.props;

    if(menu === "dia") {
      const obj = Object.assign({}, formDia);
      obj.pratos = formDia.pratos.filter((item, index)=> {return index != i});
      updateDia(obj);
      errorUpdate({["dia_name"+i]: false, ["dia_price"+i]: false, ["dia_price2"+i]: false});
    } else if (menu === "carne") {
      const obj = Object.assign({}, formCarne);
      obj.pratos = formCarne.pratos.filter((item, index)=> {return index != i});
      updateCarne(obj);
      errorUpdate({["carne_name"+i]: false, ["carne_price"+i]: false, ["carne_price2"+i]: false});
    } else if (menu === "peixe") {
      const obj = Object.assign({}, formPeixe);
      obj.pratos = formPeixe.pratos.filter((item, index)=> {return index != i});
      updatePeixe(obj);
      errorUpdate({["peixe_name"+i]: false, ["peixe_price"+i]: false, ["peixe_price2"+i]: false});
    }

  }


  submit(f) {
    if(f === "dia") {
      for(var i=0; i<this.props.formDia.pratos.length; i++) {
        if(this.props.formError["dia_name"+i] || this.props.formError["dia_name"+i]) {break;} else if (i === this.props.formDia.pratos.length-1) {
          this.props.postDia(this.props.formDia);
        }
      }
    } else if (f === "carne") {
      for(var i=0; i<this.props.formCarne.pratos.length; i++) {
        if(this.props.formError["carne_name"+i] || this.props.formError["carne_name"+i]) {break;} else if (i === this.props.formCarne.pratos.length-1) {
          this.props.postCarne(this.props.formCarne);
        }
      }
    } else if (f === "peixe") {
      for(var i=0; i<this.props.formPeixe.pratos.length; i++) {
        if(this.props.formError["peixe_name"+i] || this.props.formError["peixe_name"+i]) {break;} else if (i === this.props.formPeixe.pratos.length-1) {
          this.props.postPeixe(this.props.formPeixe);
        }
      }
    }
  }



  render() {
    const {inputUpdate, errorUpdate, formData, formError, formDia, formCarne, formPeixe} = this.props;
    return (
      <div id="office" className="row-padding" ref={this.props.refe}>

        <form>
          <div className="col l6 pratosDia">
            <div className="container">
              <div>
                <h2>Pratos do Dia</h2>
              </div>
              <a className={this.state.today ? "btn-day active" : "btn-day" } onClick={()=> this.today()}>Hoje</a>
              <a className={this.state.today ? "btn-day" : "btn-day active" } onClick={()=> this.tomorrow()}>Amanhã</a>
              <div className="row-padding">
                <div className="col s6 l6">Nome</div>
                <div className="col s2 l2">1/2 Dose</div>
                <div className="col s2 l2">1 Dose</div>
              </div>
              {formDia.pratos ? formDia.pratos.map((item,index,arr) => (
                <div className="row-padding input-row" key={index}>
                  <div className="col s6 l6">
                    <NameInput index={index} menu="dia" defaultValue={item.name} name={"dia_name"+index} placeholder="Polvo à..." data={item.name} error={formError["dia_name"+index]} inputUpdate={this.updateDiaN} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s2 l2">
                    <NumberInput index={index} menu="dia" defaultValue={item.price} name={"dia_price"+index} placeholder="7.5" data={item.price} error={formError["dia_price"+index]} inputUpdate={this.updateDiaP} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s2 l2">
                    <NumberInput index={index} menu="dia" defaultValue={item.price2||""} name={"dia_price2"+index} placeholder="13" data={item.price2||""} error={formError["dia_price2"+index]} inputUpdate={this.updateDiaP2} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s1 l1">
                    <a className="btn btn-blue" onClick={()=>this.over(index, "dia")}><i className="fa fa-eraser"/></a>
                  </div>
                  <div className="col s1 l1">
                    <a className="btn btn-red" onClick={()=>this.removeRow(index, "dia")}><i className="fa fa-times"/></a>
                  </div>
                </div>
              )) : null}

              <div className="add-input"><a className="btn btn-blue" onClick={()=>this.addRow("dia")}><i className="fa fa-plus"/> Adicionar Linha</a></div>
              <div className="submit-input"><a className="btn btn-green" onClick={()=>this.submit("dia")}><i className="fa fa-check"/> Submeter Menu</a></div>
            </div>
          </div>

          <div className="col l6 pratosCarne">
            <div className="container">
              <div>
                <h2>Pratos de Carne</h2>
              </div>

              <div className="row-padding">
                <div className="col s6 l6">Nome</div>
                <div className="col s2 l2">1/2 Dose</div>
                <div className="col s2 l2">1 Dose</div>
              </div>
              {formCarne.pratos ? formCarne.pratos.map((item,index,arr) => (
                <div className="row-padding input-row" key={index}>
                  <div className="col s6 l6">
                    <NameInput index={index} menu="carne" defaultValue={item.name} name={"carne_name"+index} placeholder="Polvo à..." data={item.name} error={formError["carne_name"+index]} inputUpdate={this.updateDiaN} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s2 l2">
                    <NumberInput index={index} menu="carne" defaultValue={item.price} name={"carne_price"+index} placeholder="7.5" data={item.price} error={formError["carne_price"+index]} inputUpdate={this.updateDiaP} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s2 l2">
                    <NumberInput index={index} menu="carne" defaultValue={item.price2||""} name={"carne_price2"+index} placeholder="13" data={item.price2||""} error={formError["carne_price2"+index]} inputUpdate={this.updateDiaP2} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s1 l1">
                    <a className="btn btn-blue" onClick={()=>this.over(index, "carne")}><i className="fa fa-eraser"/></a>
                  </div>
                  <div className="col s1 l1">
                    <a className="btn btn-red" onClick={()=>this.removeRow(index, "carne")}><i className="fa fa-times"/></a>
                  </div>
                </div>
              )) : null}

              <div className="add-input"><a className="btn btn-blue" onClick={()=>this.addRow("carne")}><i className="fa fa-plus"/> Adicionar Linha</a></div>
              <div className="submit-input"><a className="btn btn-green" onClick={()=>this.submit("carne")}><i className="fa fa-check"/> Submeter Menu</a></div>
            </div>
          </div>

          <div className="col l6 pratosPeixe">
            <div className="container">
              <div>
                <h2>Pratos de Peixe</h2>
              </div>

              <div className="row-padding">
                <div className="col s6 l6">Nome</div>
                <div className="col s2 l2">1/2 Dose</div>
                <div className="col s2 l2">1 Dose</div>
              </div>
              {formPeixe.pratos ? formPeixe.pratos.map((item,index,arr) => (
                <div className="row-padding input-row" key={index}>
                  <div className="col s6 l6">
                    <NameInput index={index} menu="peixe" defaultValue={item.name} name={"peixe_name"+index} placeholder="Polvo à..." data={item.name} error={formError["peixe_name"+index]} inputUpdate={this.updateDiaN} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s2 l2">
                    <NumberInput index={index} menu="peixe" defaultValue={item.price} name={"peixe_price"+index} placeholder="7.5" data={item.price} error={formError["peixe_price"+index]} inputUpdate={this.updateDiaP} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s2 l2">
                    <NumberInput index={index} menu="peixe" defaultValue={item.price2||""} name={"peixe_price2"+index} placeholder="13" data={item.price2||""} error={formError["peixe_price2"+index]} inputUpdate={this.updateDiaP2} errorUpdate={errorUpdate}/>
                  </div>
                  <div className="col s1 l1">
                    <a className="btn btn-blue" onClick={()=>this.over(index, "peixe")}><i className="fa fa-eraser"/></a>
                  </div>
                  <div className="col s1 l1">
                    <a className="btn btn-red" onClick={()=>this.removeRow(index, "peixe")}><i className="fa fa-times"/></a>
                  </div>
                </div>
              )) : null}

              <div className="add-input"><a className="btn btn-blue" onClick={()=>this.addRow("peixe")}><i className="fa fa-plus"/> Adicionar Linha</a></div>
              <div className="submit-input"><a className="btn btn-green" onClick={()=>this.submit("peixe")}><i className="fa fa-check"/> Submeter Menu</a></div>

            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Office)
