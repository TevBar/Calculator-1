// this constructor below is used for knowing where the prev and current operators are displayed on the calculator

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement ){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }


clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined
}

delete() {
this.currentOperand = this.currentOperand.toString().slice(0, -1);
}



// creating a function that determines what 
// will occur every time a user clicks on a number to add to the display called 'appendNumber(number).'
// basically when a user clicks the button on the calculator to produce a equation
// appendNumber adds the number to the calculator and the button.innerText displays the content in the output

appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

// One more thing that you can add to the calculator is the 
// ability to compute an operation automatically while simultaneously completing another one.
// when we can compute 20 + 20 = total / 5

// We need to add a check-in for that. You can just say if the current operation is empty, 
// then return, which again will not let you execute any further into your code.

chooseOperation(operation) {
    if(this.currentOperand === '')return
    if(this.previousOperand !== '') { 
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute(){
    let computation 
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch (this.operation) { 
        case '+':
            computation = prev + current
            break;
        case '-': 
            computation = prev - current 
            break;
        case '*': 
            computation = prev * current
            break;
        case '÷':
            computation = prev / current 
            break;
            default:
            return;
    
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''

}


getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerDigits)) {
        integerDisplay = ''
    } else{
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if(decimalDigits != null ) {
        return `${integerDisplay}.${decimalDigits}`
    } 
    else { 
        return integerDisplay
    }
}

updateDisplay() {
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand)
    if(this.operation != null) { 
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
     } else { 
            this.previousOperandTextElement.innerText = ''
        }
    }
}


// constants variables below. 

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})



//  equals button only has one so we do not need to use the .forEach method
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});


allClearButton.addEventListener('click', button => { 
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => { 
    calculator.delete()
    calculator.updateDisplay()
})

document.addEventListener('keydown', function(event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if(event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if(event.key == '.') {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if(event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }
    if(event.key === 'Enter' || event.key === '='){
        event.preventDefault();
        calculator.compute()
        calculator.updateDisplay()
    }
    if(event.key === "Backspace"){
        event.preventDefault()
        calculator.compute()
        calculator.updateDisplay()
    }
    if(event.key === "delete"){
        event.preventDefault()
        calculator.clear()
        calculator.updateDisplay()
    }
});





