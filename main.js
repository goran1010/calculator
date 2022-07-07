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
  if (previousNumber && currentNumber && operator == `equals`) return;
  previousNumber = operator(previousNumber, currentNumber);
  calculatorScreen.textContent = previousNumber;
  currentNumber = undefined;
  operator = `equals`;
});

const numberButtons = Array.from(document.querySelectorAll(`.numberButton`));
numberButtons.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    if (currentNumber) {
      if (Number(currentNumber.length) > 15) return;
    }
    if (
      currentNumber &&
      currentNumber.includes(`.`) &&
      e.target.textContent == `.`
    )
      return;
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

document.addEventListener(`keydown`, onKeyDown);

function onKeyDown(e) {
  if (e.key == 1) {
    document.querySelector(`#buttonOne`).click();
    document.querySelector(`#buttonOne`).classList.add(`yellowBorder`);
  }
  if (e.key == 2) {
    document.querySelector(`#buttonTwo`).click();
    document.querySelector(`#buttonTwo`).classList.add(`yellowBorder`);
  }
  if (e.key == 3) {
    document.querySelector(`#buttonThree`).click();
    document.querySelector(`#buttonThree`).classList.add(`yellowBorder`);
  }
  if (e.key == 4) {
    document.querySelector(`#buttonFour`).click();
    document.querySelector(`#buttonFour`).classList.add(`yellowBorder`);
  }
  if (e.key == 5) {
    document.querySelector(`#buttonFive`).click();
    document.querySelector(`#buttonFive`).classList.add(`yellowBorder`);
  }
  if (e.key == 6) {
    document.querySelector(`#buttonSix`).click();
    document.querySelector(`#buttonSix`).classList.add(`yellowBorder`);
  }
  if (e.key == 7) {
    document.querySelector(`#buttonSeven`).click();
    document.querySelector(`#buttonSeven`).classList.add(`yellowBorder`);
  }
  if (e.key == 8) {
    document.querySelector(`#buttonEight`).click();
    document.querySelector(`#buttonEight`).classList.add(`yellowBorder`);
  }
  if (e.key == 9) {
    document.querySelector(`#buttonNine`).click();
    document.querySelector(`#buttonNine`).classList.add(`yellowBorder`);
  }
  if (e.key == 0) {
    document.querySelector(`#buttonZero`).click();
    document.querySelector(`#buttonZero`).classList.add(`yellowBorder`);
  }
  if (e.key == `c`) {
    document.querySelector(`#buttonClear`).click();
    document.querySelector(`#buttonClear`).classList.add(`yellowBorder`);
  }
  if (e.key == `.`) {
    document.querySelector(`#buttonPoint`).click();
    document.querySelector(`#buttonPoint`).classList.add(`yellowBorder`);
  }
  if (e.key == `+`) {
    document.querySelector(`#buttonAddition`).click();
    document.querySelector(`#buttonAddition`).classList.add(`yellowBorder`);
  }
  if (e.key == `-`) {
    document.querySelector(`#buttonSubtraction`).click();
    document.querySelector(`#buttonSubtraction`).classList.add(`yellowBorder`);
  }
  if (e.key == `*`) {
    document.querySelector(`#buttonMultiplication`).click();
    document
      .querySelector(`#buttonMultiplication`)
      .classList.add(`yellowBorder`);
  }
  if (e.key == `/`) {
    document.querySelector(`#buttonDivision`).click();
    document.querySelector(`#buttonDivision`).classList.add(`yellowBorder`);
  }
  if (e.keyCode == 13) {
    document.querySelector(`#buttonEquals`).click();
    document.querySelector(`#buttonEquals`).classList.add(`yellowBorder`);
  }
  if (e.keyCode == 8) {
    document.querySelector(`#buttonBackspace`).click();
    document.querySelector(`#buttonBackspace`).classList.add(`yellowBorder`);
  }
}

document.addEventListener(`keyup`, onKeyUp);
function onKeyUp(e) {
  if (e.key == 1) {
    document.querySelector(`#buttonOne`).classList.remove(`yellowBorder`);
  }
  if (e.key == 2) {
    document.querySelector(`#buttonTwo`).classList.remove(`yellowBorder`);
  }
  if (e.key == 3) {
    document.querySelector(`#buttonThree`).classList.remove(`yellowBorder`);
  }
  if (e.key == 4) {
    document.querySelector(`#buttonFour`).classList.remove(`yellowBorder`);
  }
  if (e.key == 5) {
    document.querySelector(`#buttonFive`).classList.remove(`yellowBorder`);
  }
  if (e.key == 6) {
    document.querySelector(`#buttonSix`).classList.remove(`yellowBorder`);
  }
  if (e.key == 7) {
    document.querySelector(`#buttonSeven`).classList.remove(`yellowBorder`);
  }
  if (e.key == 8) {
    document.querySelector(`#buttonEight`).classList.remove(`yellowBorder`);
  }
  if (e.key == 9) {
    document.querySelector(`#buttonNine`).classList.remove(`yellowBorder`);
  }
  if (e.key == 0) {
    document.querySelector(`#buttonZero`).classList.remove(`yellowBorder`);
  }
  if (e.key == `c`) {
    document.querySelector(`#buttonClear`).classList.remove(`yellowBorder`);
  }
  if (e.key == `.`) {
    document.querySelector(`#buttonPoint`).classList.remove(`yellowBorder`);
  }
  if (e.key == `+`) {
    document.querySelector(`#buttonAddition`).classList.remove(`yellowBorder`);
  }
  if (e.key == `-`) {
    document
      .querySelector(`#buttonSubtraction`)
      .classList.remove(`yellowBorder`);
  }
  if (e.key == `*`) {
    document
      .querySelector(`#buttonMultiplication`)
      .classList.remove(`yellowBorder`);
  }
  if (e.key == `/`) {
    document.querySelector(`#buttonDivision`).classList.remove(`yellowBorder`);
  }
  if (e.keyCode == 13) {
    document.querySelector(`#buttonEquals`).classList.remove(`yellowBorder`);
  }
  if (e.keyCode == 8) {
    document.querySelector(`#buttonBackspace`).classList.remove(`yellowBorder`);
  }
}
