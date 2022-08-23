import './App.css';
import React, { Component } from "react";

const isZero=/^0$/;
const endWithOneOperator = /\d[x/+-]{1}$/;
const endWithOperator =/[x/+-]$/;
const endWithNegOperator = /\d[x/+-]{1}-$/;

class App extends Component {
  constructor(props){
    super(props);
    this.state={ 
      input:"",      
      output:"0",
      prevVal:"0",
      done:false,
    }
    this.initialize = this.initialize.bind(this);
    this.handleNum = this.handleNum.bind(this);
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  initialize(){
    this.setState({
      input:"",
      output:"0",
      prevVal:"0",
      done:false,
    });
  }
  maxDigitWarning(){
     this.setState({
      output: 'Limit Reached',
      prevVal: this.state.output
    });
    setTimeout(() => this.setState({ output: this.state.prevVal }), 500);
  }
  handleNum(event){
    if(!this.state.output.includes("Limit")){
      const value = event.target.value;
      if (this.state.output.length > 21) {
        this.maxDigitWarning();
      }else if(this.state.done){
        this.setState({
          output:value,
          done:false,
          input:value !== '0' ? value : ''
        });
      }else{
        this.setState({
          input:
            isZero.test(this.state.output)
            ? value
            : this.state.input + value,
          output:
            isZero.test(this.state.output) || endWithOperator.test(this.state.input)
            ? value 
            : this.state.output + value
        });
      }
    }
  }
  handleOperator(event){
    const value = event.target.value;
    if(this.state.done){
      this.setState({
        input:this.state.output + value,
        output:value,
        done:false
      });
    }else{
      if(endWithOperator.test(this.state.input)){
        if(value==="-"){
          if(endWithOneOperator.test(this.state.input)){
            this.setState({
              input:this.state.input+value,
              output:value
            })
          }else{
            this.setState({
            input:this.state.input
            })
          }
        }else{
          if(endWithOneOperator.test(this.state.input) && value!=="-"){
            this.setState({
            input:this.state.input.slice(0,-1)+value,
            output:value
          })
          }else if(endWithNegOperator.test(this.state.input)){
            this.setState({
            input:this.state.input.slice(0,-2)+value,
            output:value
          })
          }
        }
      }else{
        this.setState({
          input:this.state.input+value,
          output:value
        })
      }
    }
  }
  handleDecimal(){
    if(this.state.done){
      this.setState({
        input:"0.",      
        output:"0.",
        done:false,
      })
    }else{
      if(this.state.output==="0"){
        this.setState({
          input:this.state.input+"0.",
          output:this.state.output+"."
        })
      }else if(!this.state.output.includes(".")){
        this.setState({
          input:this.state.input+".",
          output:this.state.output+"."
        })
      }else{
        this.setState({
          input:this.state.input,
          output:this.state.output
        })
      }
    }
  }
  calculate(){
    let formula = this.state.input;
  
    while (endWithOperator.test(formula)) {
        formula = formula.slice(0, -1);
      }
    formula = formula
        .replace(/x/g, '*')
        .replace('--', '+00+');
    let answer = Math.round(1000000000000 * eval(formula)) / 1000000000000;
    this.setState({
        output: answer.toString(),
        input:
          formula
            .replace(/\*/g, 'x')
            .replace('+00+', '‑-')
            .replace(/(x|\/|\+)‑/, '$1-')
            .replace(/^‑/, '-') +
          '=' +
          answer,
        prevVal: answer,
        done: true
      });
  }
  
  render(){
    return(
    <div id="calculator">
      <div id="digital-display">
        <div id="input-text">
          {this.state.input}
        </div>
        <div id="display">
          {this.state.output}
        </div>
      </div>
      <div id="buttons">
        <button 
          id="clear"
          className="big"
          onClick={this.initialize}
          value="AC"
          >AC</button> 
        <button
          id="divide"
          className="operator"
          onClick={this.handleOperator}
          value="/"
          >/</button>
        <button
          id="multiply"
          className="operator"
          onClick={this.handleOperator}
          value="x"
          >x</button>
        <button
          id="seven"
          className="number"
          onClick={this.handleNum}
          value="7"
          >7</button>
        <button
          id="eight"
          className="number"
          onClick={this.handleNum}
          value="8"
          >8</button>
        <button
          id="nine"
          className="number"
          onClick={this.handleNum}
          value="9"
          >9</button>
        <button
          id="subtract"
          className="operator"
          onClick={this.handleOperator}
          value="-"
          >-</button>
        <button
          id="four"
          className="number"
          onClick={this.handleNum}
          value="4"
          >4</button>
        <button
          id="five"
          className="number"
          onClick={this.handleNum}
          value="5"
          >5</button>
        <button
          id="six"
          className="number"
          onClick={this.handleNum}
          value="6"
          >6</button>
        <button
          id="add"
          className="operator"
          onClick={this.handleOperator}
          value="+"
          >+</button>
        <button
          id="one"
          className="number"
          onClick={this.handleNum}
          value="1"
          >1</button>
        <button
          id="two"
          className="number"
          onClick={this.handleNum}
          value="2"
          >2</button>
        <button
          id="three"
          className="number"
          onClick={this.handleNum}
          value="3"
          >3</button>
        <button
          id="equals"
          className="equals"
          onClick={this.calculate}
          value="="
          >=</button>
        <button
          id="zero"
          className="number big"
          onClick={this.handleNum}
          value="0"
          >0</button>
        <button
          id="decimal"
          className="number"
          onClick={this.handleDecimal}
          value="."
          >.</button>
      </div>
    </div>
    );
  }
}

export default App;
