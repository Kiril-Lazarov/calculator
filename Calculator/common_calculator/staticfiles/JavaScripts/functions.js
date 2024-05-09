// A collection of functions
// that take the values input from the calculator's display,
// process them, and output them to the result screen.


let digitsMassive = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


//Extracts last integer ot floating point number after the last operation sign
function extractLastNumber(stringValue) {

    // Find all numbers in the stringValue.
    const regex = /\d+\.\d+|\d+/gm;

    const matches = [...stringValue.matchAll(regex)];

    const numbersMassive = matches.map(match => match[0]);

    //Return the last number
    return numbersMassive[numbersMassive.length - 1]
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


// Clean the input from redundant zeroes
function inputPreprocessing(screen) {
    let lastNumber = extractLastNumber(screen.value);
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
        // Clean the input from redundant zeroes
        inputPreprocessing(screen)
        handleInput(screen, resultScreen)
    }

}





