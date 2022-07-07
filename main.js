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

const backspaceButton = document.querySelector(`#buttonBackspace`);
backspaceButton.addEventListener(`click`, () => {
  if (!currentNumber) return;
  currentNumber = currentNumber.slice(0, currentNumber.length - 1);
  if (currentNumber == ``) {
    currentNumber = undefined;
    calculatorScreen.textContent = 0;
  } else calculatorScreen.textContent = currentNumber;
});

const equalsButton = document.getElementById(`buttonEquals`);
equalsButton.addEventListener(`click`, (e) => {
  if (currentNumber == 0 && operator == divide) {
    clear();
    calculatorScreen.textContent = `ERROR,DIVISION BY 0`;
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
    if (
      currentNumber &&
      currentNumber.includes(`.`) &&
      e.target.textContent == `.`
    )
      return;
    if (Number(currentNumber) > 9999999999999) return;
    if ((!currentNumber || currentNumber == 0) && e.target.textContent == `.`) {
      currentNumber = `0.`;
      calculatorScreen.textContent = currentNumber;
      return;
    }
    if (currentNumber == `0.` && e.target.textContent == `.`) {
      return;
    }
    if (currentNumber && currentNumber.includes(`.`)) {
      currentNumber += e.target.textContent;
      calculatorScreen.textContent = currentNumber;
      return;
    }
    if (
      currentNumber &&
      currentNumber.includes(`.`) &&
      e.target.textContent == `0`
    ) {
      currentNumber += e.target.textContent;
      calculatorScreen.textContent = currentNumber;
      return;
    }
    if (currentNumber == 0 && e.target.textContent == 0) {
      currentNumber = 0;
      calculatorScreen.textContent = currentNumber;
      return;
    }
    if (!previousNumber && currentNumber == 0 && e.target.textContent != 0) {
      currentNumber = e.target.textContent;
      calculatorScreen.textContent = currentNumber;
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

document.addEventListener(`keydown`, checkKey);
function checkKey(e) {
  if (e.key == 1) {
    document.querySelector(`#buttonOne`).click();
  }
  if (e.key == 2) {
    document.querySelector(`#buttonTwo`).click();
  }
  if (e.key == 3) {
    document.querySelector(`#buttonThree`).click();
  }
  if (e.key == 4) {
    document.querySelector(`#buttonFour`).click();
  }
  if (e.key == 5) {
    document.querySelector(`#buttonFive`).click();
  }
  if (e.key == 6) {
    document.querySelector(`#buttonSix`).click();
  }
  if (e.key == 7) {
    document.querySelector(`#buttonSeven`).click();
  }
  if (e.key == 8) {
    document.querySelector(`#buttonEight`).click();
  }
  if (e.key == 9) {
    document.querySelector(`#buttonNine`).click();
  }
  if (e.key == 0) {
    document.querySelector(`#buttonZero`).click();
  }
  if (e.key == `c`) {
    document.querySelector(`#buttonClear`).click();
  }
  if (e.key == `.`) {
    document.querySelector(`#buttonPoint`).click();
  }
  if (e.key == `+`) {
    document.querySelector(`#buttonAddition`).click();
  }
  if (e.key == `-`) {
    document.querySelector(`#buttonSubtraction`).click();
  }
  if (e.key == `*`) {
    document.querySelector(`#buttonMultiplication`).click();
  }
  if (e.key == `/`) {
    document.querySelector(`#buttonDivision`).click();
  }
  if (e.keyCode == 13) {
    document.querySelector(`#buttonEquals`).click();
  }
  if (e.keyCode == 8) {
    document.querySelector(`#buttonBackspace`).click();
  }
}
