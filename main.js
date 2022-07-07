let previousNumber;
let currentNumber;
let operator;

function add(a, b) {
  return Math.round((Number(a) + Number(b)) * 1000000) / 1000000;
}
function subtract(a, b) {
  return Math.round((Number(a) - Number(b)) * 1000000) / 1000000;
}
function multiply(a, b) {
  return Math.round(Number(a) * Number(b) * 1000000) / 1000000;
}

function divide(a, b) {
  if (b == 0) return;
  return Math.round((Number(a) / Number(b)) * 1000000) / 1000000;
}

function clear() {
  previousNumber = undefined;
  currentNumber = undefined;
  operator = undefined;
  calculatorScreen.textContent = 0;
}

function checkCurrentOperator(e) {
  if (e.target.textContent === `+`) return add;
  if (e.target.textContent === `-`) return subtract;
  if (e.target.textContent === `*`) return multiply;
  return divide;
}

function calculate(e) {
  if (currentNumber == 0 && operator == divide) {
    clear();
  }
  currentOperator = checkCurrentOperator(e);
  if (operator === `equals`) {
    operator = currentOperator;
    calculatorScreen.textContent = `${previousNumber} ${e.target.textContent}`;
    currentNumber = undefined;
    return;
  }
  if (!operator) {
    if (!currentNumber) {
      return;
    }
    calculatorScreen.textContent = `${currentNumber} ${e.target.textContent}`;
    operator = currentOperator;
    previousNumber = currentNumber;
    currentNumber = undefined;
  } else if (currentNumber) {
    previousNumber = operator(previousNumber, currentNumber);
    currentNumber = undefined;
    operator = currentOperator;
    calculatorScreen.textContent = `${previousNumber} ${e.target.textContent}`;
  }
}

const operatorButtons = Array.from(
  document.querySelectorAll(`.operatorButton`)
);
operatorButtons.forEach((element) =>
  element.addEventListener(`click`, calculate)
);

const calculatorScreen = document.querySelector(`#screen`);

const clearButton = document.querySelector(`#buttonClear`);
clearButton.addEventListener(`click`, clear);
const equalsButton = document.getElementById(`buttonEquals`);
equalsButton.addEventListener(`click`, (e) => {
  if (currentNumber == 0 && operator == divide) {
    clear();
  }
  if (!previousNumber || !operator || !currentNumber) {
    return;
  }
  previousNumber = operator(previousNumber, currentNumber);
  calculatorScreen.textContent = previousNumber;
  currentNumber = undefined;
  operator = `equals`;
});

const numberButtons = Array.from(document.querySelectorAll(`.numberButton`));
numberButtons.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    if (!previousNumber && !currentNumber && e.target.textContent == 0) {
      return;
    }
    if (operator === `equals`) {
      if (!currentNumber) {
        currentNumber = e.target.textContent;
        previousNumber = currentNumber;
      } else {
        currentNumber += e.target.textContent;
        previousNumber = currentNumber;
      }
    } else if (!currentNumber) {
      currentNumber = e.target.textContent;
    } else {
      currentNumber += e.target.textContent;
    }
    calculatorScreen.textContent = currentNumber;
  });
});
