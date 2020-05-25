import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: "0",
      equation: ""
    }
    this.numInput = this.numInput.bind(this);
    this.operInput = this.operInput.bind(this);
    this.decInput = this.decInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  numInput(e){
    if(this.state.equation.match(/[0-9\.]$/) && !this.state.equation.includes("=")){
      if(this.state.equation.match(/[+\-*\/]/) == null){
        let val = this.state.equation + e.currentTarget.value;
        this.setState({
          display: val,
          equation: val
        });
      } else {
        this.setState({
          display: this.state.display + e.currentTarget.value,
          equation: this.state.equation + e.currentTarget.value
        });
      }
    } else if(this.state.equation.match(/[+\-*\/]$/)){
      let val = this.state.equation + e.currentTarget.value;
      this.setState({
        display: e.currentTarget.value,
        equation: val
      });
    } else if(this.state.display === "0" && e.currentTarget.value !== "0" || this.state.equation.includes("=")) {
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value
      });
    }
  }

  opInput(e) {
    if(this.state.equation.includes('=')) {
      let val = this.state.display;
      val += e.currentTarget.value;
      this.setState({
        equation: val
      });
    } else {
      if(this.state.equation != '' && this.state.equation.match(/[*\-\/+]$/) == null) {
        let val = this.state.equation;
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      } else if(this.state.equation.match(/[*\-\/+]$/) != null) {
        let val = this.state.equation;
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      } 
    }
}

decInput(e) {
  if(this.state.equation == '' || this.state.equation.includes('=')){
    let val = '0.';
    this.setState({
      display: val,
      equation: val
    });
  } else if(this.state.equation.match(/[+\-*\/]$/)) {
    let val = '0.';
    this.setState({
      display: val,
      equation: this.state.equation + val
    });
  } else if(!this.state.display.includes('.')) {
    this.setState({
      display: this.state.display + e.currentTarget.value,
      equation: this.state.equation + e.currentTarget.value
    });
  }
}

clearInput() {
  this.setState({
    display: '0',
    equation: ''
  });
}

calculate() {
  if(this.state.equation.includes('=')) {
    let val = `${this.state.display} = ${this.state.display}`;
    this.setState({
      equation: val
    });
  } else if(this.state.equation != '' && this.state.equation.match(/[+\-*\/]/) != null && this.state.equation.match(/[+\-*\/]$/)) {
    let result = Number.isInteger(eval(this.state.equation)) ? eval(this.state.equation) : parseFloat(eval(this.state.equation).toFixed(5));
    let val = this.state.equation;
    val += ` = ${result}`;
    this.setState({
      display: result,
      equation: val
    });
  }
}



}