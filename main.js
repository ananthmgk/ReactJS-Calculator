
const projectName = "javascript-calcultor";

const clearStyle = { background: '#ac3939' };
const operatorStyle = {  background: '#666666' };
const equalsStyle = {
  background: '#004466',
  position: 'absolute',
  height: 130,
  bottom: 5
};

const isOperator = /[x/+-]/

class Calculator extends React.Component {
  state = {
    currentVal: '0',
    formula: '',
    evaluated : false
  };
  
  handleEvaluate = () => {
    this.setState(prevState => {
      if (prevState.evaluated) {
        return {};
      }
      else {
        while (/.+[+x/-]$/.test(prevState.formula)) {
        prevState.formula = prevState.formula.slice(0, -1)
        };
      }
      const expression = prevState.formula.replace(/x/g, '*').replace(/--/g, '+');
      const answer = '' + eval(expression);
      return {
        formula : prevState.formula + '=' + answer,
        currentVal : answer,
        evaluated : true
        }
    })
  };
  
  handleOperators = (e) => {
    const currentOperator = e.target.value;
    this.setState(prevState => {
      if (prevState.evaluated) {
        return {
          currentVal: currentOperator,
          formula: prevState.currentVal + currentOperator,
          evaluated: false
        };
      }
      let currentFormula = prevState.formula;
      if(currentOperator === '-') {
        //1) if(isOperator.test(currentFormula.slice(-2, -1)) && isOperator.test(currentFormula.slice(-1)))
        //2) if(['--', '+-', 'x-', '/-'].includes(currentFormula.slice(-2)))
        //3) if(/[+x/-]-/.test(currentFormula.slice(-2))) here [+x/-] first character from any operator, second character is minus.
        if(/.+[+x/-]-$/.test(currentFormula)) { // here . is any character, + is more than one, ....., $ is end.
          return {
            currentVal : prevState.currentVal,
            formula : currentFormula
          }
        }
      } 
      else {
        // while (isOperator.test(currentFormula.slice(-1)))
        while (/.+[+x/-]$/.test(currentFormula)) { // here currentFormula ends with operator. and while loop deletes the operator which placed in the last.
          currentFormula = currentFormula.slice(0, -1)
        }
        return {
          currentVal : currentOperator,
          formula : currentFormula + currentOperator
        }
      }
      return {
        currentVal : currentOperator,
        formula : currentFormula + currentOperator
      }
    });
  }
  
  handleNumbers = (event) => {
    this.setState(prevState => {
      if(prevState.evaluated) {
        return this.getInitialState();
      };
    });
    
    this.setState(prevState => {
      if(prevState.currentVal === '0') {
        return {
          currentVal : event.target.value,
          formula : event.target.value
        }
      }
      else if(isOperator.test(prevState.currentVal)) {
        return {
          currentVal : event.target.value,
          formula : prevState.formula + event.target.value
        }
      }
      else {
        return {
          currentVal : prevState.currentVal + event.target.value,
          formula : prevState.formula + event.target.value
        }
      }
    });
  }
  
  handleDecimal = () => {
    this.setState(prevState => {
      if(prevState.evaluated) {
        prevState = this.getInitialState();
      };
      if(prevState.currentVal.includes('.')) {
        return {
          currentVal : prevState.currentVal,
          formula : prevState.formula
        };
      }
      else {
        let currentFormula = prevState.formula;
        if(currentFormula === '') {
          currentFormula = '0';
        }
        return {
          currentVal : prevState.currentVal + '.',
          formula : currentFormula + '.',
          evaluated: false
        }
      };
    });
  }
  
  getInitialState = () => {
    return {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      evaluated : false
    }
  };
    
  initialize = () => {
    this.setState(this.getInitialState());
  };
  
    render() {
    return (
      <div>
        <div className="calculator">
          <Formula formula={this.state.formula} />
          <Output currentValue={this.state.currentVal} />
          <Buttons
            decimals={this.handleDecimal}
            evaluate={this.handleEvaluate}
            initialize={this.initialize}
            numbers={this.handleNumbers}
            operators={this.handleOperators}
          />
        </div>
        <div className="author">
          Designed and Coded By <br />
          <a href="#" target="_blank">
            Ananth
          </a>
        </div>
      </div>
    );
  }
};

const Buttons = (props) => {
  return (
    <div>
      <button
        className="jumbo"
        id="clear"
        onClick={props.initialize}
        style={clearStyle}
        value="AC"
      >
        AC
      </button>
      <button
        id="divide"
        onClick={props.operators}
        style={operatorStyle}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        onClick={props.operators}
        style={operatorStyle}
        value="x"
      >
        x
      </button>
      <button
        id="seven"
        onClick={props.numbers}
        value="7"
      >
        7
      </button>
      <button
        id="eight"
        onClick={props.numbers}
        value="8"
      >
        8
      </button>
      <button
        id="nine"
        onClick={props.numbers}
        value="9"
      >
        9
      </button>
      <button
        id="subtract"
        onClick={props.operators}
        style={operatorStyle}
        value="-"
      >
        -
      </button>
      <button
        id="four"
        onClick={props.numbers}
        value="4"
      >
        4
      </button>
      <button
        id="five"
        onClick={props.numbers}
        value="5"
      >
        5
      </button>
      <button
        id="six"
        onClick={props.numbers}
        value="6"
      >
        6
      </button>
      <button
        id="add"
        onClick={props.operators}
        style={operatorStyle}
        value="+"
      >
        +
      </button>
      <button
        id="one"
        onClick={props.numbers}
        value="1"
      >
        1
      </button>
      <button
        id="two"
        onClick={props.numbers}
        value="2"
      >
        2
      </button>
      <button
        id="three"
        onClick={props.numbers}
        value="3"
      >
        3
      </button>
      <button
        className="jumbo"
        id="zero"
        onClick={props.numbers}
        style={clearStyle}
        value="0"
      >
        0
      </button>
      <button
        id="decimal"
        onClick={props.decimals}
        value="."
      >
        .
      </button>
      <button
        id="equals"
        onClick={props.evaluate}
        style={equalsStyle}
        value="="
      >
        =
      </button>
    </div>
  );
};

const Output = (props) => {
  return (
    <div className="outputScreen" id="display">
      { props.currentValue }
    </div>
  );
};

const Formula = (props) => {
  return (
    <div className="formulaScreen">
      { props.formula }
    </div>
  );  
};

  ReactDOM.render(<Calculator />, document.getElementById('app'));
