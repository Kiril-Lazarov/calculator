let digits = '0123456789';
let operations = '+-*/%';

let maxInputLength = 12
let longScreenInput = ''

//Defines which character can be typed on the screen after another character
let nextAllowedCharacter = {
    'first': digits + '-',
    '0': operations + '.',
    '+': digits,
    '-': digits,
    '*': digits + '-',
    '/': digits,
    '.': digits,
    '%': digits + operations
}

function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    return (charCode >= 48 && charCode <= 57) || // digits from 0 - 9
        charCode === 42 || // *
        charCode === 43 || // +
        charCode === 45 || // -
        charCode === 47 || // /
        charCode === 46 || // .
        charCode === 13 || // Enter
        charCode === 61 || // =
        charCode === 37 || // %
        charCode === 99;

}

//Extracts the given pattern from input screen
function extractStringPattern(stringValue, regexPattern) {
    const matches = [...stringValue.matchAll(regexPattern)];

    //Return massive with all matched patterns
    return matches.map(match => match[0]);
}

function clearScreen(value, screen) {
    let newScreenValue = screen.value
    if (value === 'C') {
        newScreenValue = '';

    } else if (value === 'BACK') {
        newScreenValue = screen.value.slice(0, -1);
    }
    return newScreenValue
}


// Filters inputs
function handleInputs(screen, inputValue, elementType) {
    let newScreenValue = screen.value
    let lastChar = screen.value.charAt(screen.value.length - 1)

    if (lastChar === '') {
        if (nextAllowedCharacter["first"].includes(inputValue)) {
            newScreenValue += inputValue;
            return newScreenValue
        }
    } else {
        if (elementType === 'clear_function') {
            return clearScreen(inputValue, screen)

        } else if (Object.keys(nextAllowedCharacter).includes(lastChar)) {
            let regexPattern = /\d+\.\d+|\d+/gm;
            const matchedPatternsMassive = extractStringPattern(screen.value, regexPattern);
            let lastNumber = matchedPatternsMassive[matchedPatternsMassive.length - 1];

            if (!lastNumber) {
                lastNumber = inputValue
            }

            if (lastNumber.length === 1 && nextAllowedCharacter[lastChar].includes(inputValue)) {
                newScreenValue += inputValue;
                return newScreenValue;
            } else if (lastNumber.length > 1) {
                if (operations.includes(inputValue) && nextAllowedCharacter[lastChar].includes(inputValue)) {
                    newScreenValue += inputValue;
                    return newScreenValue
                } else if (digits.includes(inputValue)) {
                    newScreenValue += inputValue;
                    return newScreenValue
                }
            }
        } else {
            newScreenValue += inputValue;
            return newScreenValue
        }
    }
    return newScreenValue
}

// eval() cannot compute percentages.
// This function replaces each `%` symbol with *1/100
// and rewrites the input where necessary in a way suitable for eval().
function transformInputWithPercentageSymbols(screenValue) {
    if (!screenValue.includes('%')) {
        return screenValue
    }
    let regexPattern = /[+*-\/]?\d*\.?\d*%*/gm

    const matchedPatternsMassive = extractStringPattern(screenValue, regexPattern);

    let evalString = ''
    let onlyMultiplyCase = false


    matchedPatternsMassive.forEach(el => {

        if (!el.includes('%')) {
            if (el.toString() !== '*') {
                evalString += el;
            } else {
                onlyMultiplyCase = true
            }
        } else {

            if (el.includes('*') || (el.includes('/'))) {
                el = el.replace(/%/g, '*1/100')
                evalString += el;

            } else if (el.includes('+') || el.includes('-')) {
                el = el.replace(/%/g, '*1/100')
                if (onlyMultiplyCase) {
                    el = '*' + el;
                    onlyMultiplyCase = false
                }
                evalString = '(' + evalString + ')' + '*(1' + el + ')'
            } else {
                el = el.replace(/%/g, '*1/100')
                evalString += el;
            }
        }

    })
    return evalString
}


function calculateOutput(screen, inputValue) {
    let newScreenValue = screen.value;
    newScreenValue = transformInputWithPercentageSymbols(newScreenValue);
    let lastChar = screen.value.charAt(screen.value.length - 1)
    let resultScreen = '';
    try {
        resultScreen = eval(newScreenValue);

        if (resultScreen === undefined) {
            resultScreen = '';
        } else if (resultScreen === Infinity ||
            resultScreen === -Infinity ||
            resultScreen.toString() === 'NaN') {

            resultScreen = 'ERROR!\n Division by 0';
        }
        if (inputValue === '=') {
            screen.value = '';
        }
    } catch (error) {

        if (lastChar === '.') {
            screen.value = clearScreen('BACK', screen);

            // Recursive call. There is no danger of infinite invocation,
            // as the previous input value is passed here.
            resultScreen = calculateOutput(screen);
        } else if (inputValue === '=') {
            screen.value = clearScreen('BACK', screen);
            resultScreen = calculateOutput(screen);
            screen.value = '';
        }

    }


    return resultScreen
}

// Guide the movement of the expression on the screen
// from right to left when the expression is longer
// than the screen length.
function shiftScreenExpression(screen, longScreenInput) {
    let inputLength = screen.value.length;

    if (inputLength > maxInputLength) {
        let diff = inputLength - maxInputLength;
        screen.value = screen.value.substring(diff);
    }
    return longScreenInput;
}

// Guide the main logical sequence of steps in the calculations
function evaluateExpression(screen, resultScreen, elementType,
                            inputValue, longScreenInput) {
    if (longScreenInput.length > maxInputLength) {
        screen.value = longScreenInput
    }

    screen.value = handleInputs(screen, inputValue, elementType);
    longScreenInput = screen.value;
    resultScreen.value = calculateOutput(screen, inputValue);
    return shiftScreenExpression(screen, longScreenInput);
}

function clickButton(element) {

    // Get needed DOM elements
    let screen = document.getElementById("screen-inputs");
    let resultScreen = document.getElementById('resultScreen')
    let elementType = element.getAttribute('class').replace('button ', '');
    let inputValue = element.value;

    longScreenInput = evaluateExpression(screen, resultScreen, elementType,
                            inputValue, longScreenInput)

}

