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

const multiplicationButton = document.getElementById(`buttonMultiplication`);
multiplicationButton.addEventListener(`click`, (e) => {
  if (operator === `equals`) {
    operator = multiply;
    return;
  }
  if (!operator) {
    if (!currentNumber) {
      return;
    }
    operator = multiply;
    previousNumber = currentNumber;
    currentNumber = undefined;
  } else if (currentNumber) {
    previousNumber = operator(previousNumber, currentNumber);
    currentNumber = undefined;
    operator = multiply;
    calculatorScreen.textContent = previousNumber;
  }
});

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
