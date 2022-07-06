let previousNumber;
let currentNumber;
let operator;

function add(a, b) {
  return Number(a) + Number(b);
}
function subtract(a, b) {
  return Number(a) - Number(b);
}
function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (b == 0) return;
  return Number(a) / Number(b);
}

function calculate(e) {
  if (e.target.textContent === `+`) {
    currentOperator = add;
  } else if (e.target.textContent === `-`) {
    currentOperator = subtract;
  } else if (e.target.textContent === `*`) {
    currentOperator = multiply;
  } else {
    currentOperator = divide;
  }
  if (operator === `equals`) {
    operator = currentOperator;
    return;
  }
  if (!operator) {
    if (!currentNumber) {
      return;
    }
    operator = currentOperator;
    previousNumber = currentNumber;
    currentNumber = undefined;
  } else if (currentNumber) {
    previousNumber = operator(previousNumber, currentNumber);
    currentNumber = undefined;
    operator = currentOperator;
    calculatorScreen.textContent = previousNumber;
  }
}

const calculatorScreen = document.querySelector(`#screen`);

const clearButton = document.querySelector(`#buttonClear`);
clearButton.addEventListener(`click`, (e) => {
  previousNumber = undefined;
  currentNumber = undefined;
  operator = undefined;
  calculatorScreen.textContent = 0;
});

const equalsButton = document.getElementById(`buttonEquals`);
equalsButton.addEventListener(`click`, (e) => {
  if (!previousNumber || !operator || !currentNumber) {
    return;
  }
  previousNumber = operator(previousNumber, currentNumber);
  calculatorScreen.textContent = previousNumber;
  currentNumber = undefined;
  operator = `equals`;
});

const subtractionButton = document.getElementById(`buttonSubtraction`);
subtractionButton.addEventListener(`click`, calculate);

const divisionButton = document.getElementById(`buttonDivision`);
divisionButton.addEventListener(`click`, calculate);

const additionButton = document.getElementById(`buttonAddition`);
additionButton.addEventListener(`click`, calculate);

const multiplicationButton = document.getElementById(`buttonMultiplication`);
multiplicationButton.addEventListener(`click`, calculate);

const numberButtons = Array.from(document.querySelectorAll(`.numberButton`));
numberButtons.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    if (!currentNumber && e.target.textContent == 0) {
      return;
    }
    if (operator === `equals`) {
      if (!currentNumber) {
        currentNumber = e.target.textContent;
      } else {
        currentNumber += e.target.textContent;
      }
    } else if (!currentNumber) {
      currentNumber = e.target.textContent;
    } else {
      currentNumber += e.target.textContent;
    }
    calculatorScreen.textContent = currentNumber;
  });
});
