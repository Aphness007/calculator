let currentRelust = 0;
let logEntries = [];

function getUserNumberInput() {
    return parseInt(userInput.value);
}
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`
    outputResult(currentRelust, calcDescription);
}
function writeToLog(operationIdentifier, prevResult, operationNumber, newResult) {
    const entryLog = {
        operator: operationIdentifier,
        preResult: prevResult,
        number: operationNumber,
        newresult: newResult
    };
    logEntries.push(entryLog);
    console.log(logEntries);
}
function calculateResult(calculationType) {
    const enteredNumber = getUserNumberInput();
    if (calculationType !== 'ADD' &&
        calculationType !== 'SUBTRACT' &&
        calculationType !== 'MULTIPLY' &&
        calculationType !== 'DIVIDE' ||
        !enteredNumber) {
        return;
    }
    const initialResult = currentRelust;
    let mathOperator;

    if (calculationType === 'ADD') {
        currentRelust += enteredNumber;
        mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
        currentRelust -= enteredNumber;
        mathOperator = '-';
    }
    else if (calculationType === 'MULTIPLY') {
        currentRelust *= enteredNumber;
        mathOperator = '*';
    }
    else if (calculationType === 'DIVIDE') {
        currentRelust /= enteredNumber;
        mathOperator = '/';
    }
    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentRelust)
}

function add() {
    calculateResult('ADD');
}
function subtract() {
    calculateResult('SUBTRACT');
}
function multiply() {
    calculateResult('MULTIPLY');
}
function divide() {
    calculateResult('DIVIDE');

}
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);



