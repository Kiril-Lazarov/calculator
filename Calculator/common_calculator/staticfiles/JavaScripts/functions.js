// A collection of functions
// that take the values input from the calculator's display,
// process them, and output them to the result screen.


let digitsMassive = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let operationsMassive = ['+','-','*','/']

//Extracts the given pattern from input screen
function extractStringPattern(stringValue,regexPattern) {
    const matches = [...stringValue.matchAll(regexPattern)];


    //Return massive with all matched patterns
    return matches.map(match => match[0])
}
//Allows only digits, mathematical operations, and a dot to be entered from the keyboard.
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

function clearScreen(value, screen, resultScreen, redirectToHandleInput = true) {
    if (value === 'C') {
        screen.value = '';
        resultScreen.value = '';

    } else if (value === 'BACK') {
        screen.value = screen.value.slice(0, -1);

    }
    if (redirectToHandleInput) {
        handleInput(screen, resultScreen);
    }


}
// This function does not allow more than one operation
// sign on the screen, except for the combination '*-'
function operationsInputPreprocessing(screen){
    let inputScreenValue = screen.value.charAt(screen.value.length - 1)


    if (screen.value.length === 1 && inputScreenValue !== '-'){
        screen.value = '';
    }

    else if (screen.value.length === 2){
        let previousScreenValue = screen.value.charAt(screen.value.length - 2);
        if (previousScreenValue === '-'){
            screen.value = previousScreenValue ;
        }

    }

    else {
        let previousScreenValue = screen.value.charAt(screen.value.length - 2)
        if (operationsMassive.includes(inputScreenValue) &&
            operationsMassive.includes(previousScreenValue)){
            if (screen.value.includes('*-' + inputScreenValue)){
                screen.value = screen.value.replace('*-' + inputScreenValue, inputScreenValue)
            }
            else if (previousScreenValue + inputScreenValue !== '*-'){
                screen.value = screen.value.slice(0, -2)
                screen.value += inputScreenValue
            }

        }
    }
}


// Clean the input from redundant zeroes
function inputZeroesPreprocessing(screen){

    // Find all numbers in the stringValue.
    let regexPattern = /\d+\.\d+|\d+/gm
    const matchedPatternsMassive = extractStringPattern(screen.value, regexPattern);
    let lastNumber = matchedPatternsMassive[matchedPatternsMassive.length - 1]
    if (lastNumber) {
        let inputValue = lastNumber.charAt(lastNumber.length - 1); //
        let preLastChar = lastNumber.charAt(lastNumber.length - 2)
        if (lastNumber.length > 1 && preLastChar === '0') {
            if (digitsMassive.includes(inputValue)) {
                if (!lastNumber.includes('0.')) {
                    screen.value = screen.value.slice(0, -1)
                }

            }
        }
    }
}

// Decides which of the input preprocessing functions to call.
function inputPreprocessingDispatcher(screen) {
    let inputValue = screen.value.charAt(screen.value.length - 1)
    if (operationsMassive.includes(inputValue)){
        operationsInputPreprocessing(screen)
    }
    else if (digitsMassive.includes(inputValue)){
        inputZeroesPreprocessing(screen)
    }
}

function handleInput(screen, resultScreen) {

    try {
        resultScreen.value = eval(screen.value);

        if (resultScreen.value === 'undefined') {
            resultScreen.value = '';
        } else if (resultScreen.value === 'Infinity' ||
            resultScreen.value === '-Infinity' ||
            resultScreen.value === 'NaN') {

            resultScreen.value = 'ERROR!\nDivision by 0';
        }
    } catch (error) {
        let inputValue = screen.value.charAt(screen.value.length - 1)
        if (inputValue === '.') {
            clearScreen('BACK', screen, resultScreen);
        } else if (inputValue === '=') {
            clearScreen('BACK', screen, resultScreen, false);
            screen.value = '';
        }
    }
}


function clickButton(element) {
    // Get needed DOM elements
    let screen = document.getElementById("screen");
    let resultScreen = document.getElementById('resultScreen')
    let elementType = element.getAttribute('class');
    let elementValue = element.value;

    if (elementType === 'clear_function') {
        clearScreen(elementValue, screen, resultScreen)
    } else {
        screen.value += elementValue

        inputPreprocessingDispatcher(screen)
        handleInput(screen, resultScreen)
    }

}





