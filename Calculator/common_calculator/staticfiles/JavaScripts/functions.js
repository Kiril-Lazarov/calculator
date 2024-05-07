function writeValueOnScreen(value, screen, resultScreen) {
    validateScreen(value, screen, resultScreen)
}

function extractSplittingChar(stringValue) {
    
    // Find all characters which are math operations.
    const regex = /[+-/*%]/gm;

    const matches = [...stringValue.matchAll(regex)];

    const groups = matches.map(match => match[0]);

    const newGroup = groups.filter(item => item !== '.');

    const newGroupString = newGroup.join(', ');

    //Return the last char
    return newGroupString.charAt(newGroupString.length - 1)

}
function handleSpecialSymbols(value, screen, resultScreen) {
    if (value === '.') {
        //  "Splitting char" - is the last character (if any)
        // of all mathematical operations present in the expression in `screen.value`.
        // For example:
        // `12+45.0/9*2-2` -> the last math operation char is `-`
        // This will be the character we will use below to split the expression.
        let splittingChar = extractSplittingChar(screen.value);

        // Last number here means the sequence of digits
        // following the last mathematical operator symbol.
        let splitMassive = screen.value.split(splittingChar);

        // Checking if lastNumber is an array
        if (Array.isArray(splitMassive) && splitMassive.length > 0) {

            // If it is -> get lastNumber and check wether it contains `.`
            let lastNumber = splitMassive[splitMassive.length - 1];

            // If not -> add `.` to the screen.value 
            if (!lastNumber.includes(value)) {
                screen.value += value;
            }
        }
    } else if (value === '0') {
        let lastChar = screen.value.charAt(screen.value.length - 1)
        screen.value += value
        if (lastChar === '/') {
            resultScreen.value = 'ERROR! Dividing by zero!'
        }

    }

}
function clearScreen(value, screen, resultScreen) {
        if (value === 'C') {
            screen.value = '';

        } else if (value === 'BACK') {
            screen.value = screen.value.slice(0, -1);

        }
        evaluateResultOnScreen(screen, resultScreen)
    }

    let buttonAction = {
        'number': writeValueOnScreen,
        'clear_function': clearScreen,
        'operation': writeValueOnScreen,
        'special': handleSpecialSymbols
};


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

let operationsMassive = ['-', '+', '*', '/', '%'];
let numbersMassive = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let dot = ['.'];

function evaluateResultOnScreen(screen, resultScreen) {
        if (screen.value.length !== 0) {
            let lastChar = screen.value.charAt(screen.value.length - 1)
            if (operationsMassive.includes(lastChar)) {
                resultScreen.value = '';
            } else {                
                resultScreen.value = eval(screen.value);
                if (resultScreen.value === 'Infinity' || resultScreen.value === '-Infinity'){
                    resultScreen.value = 'ERROR! Dividing by zero!'
                }
            }
        } else {
            resultScreen.value = '';
        }
}

function validateScreen(value, screen, resultScreen) {
        if (screen.value.length !== 0) {

            let lastChar = screen.value.charAt(screen.value.length - 1)
            if (numbersMassive.concat(dot).includes(lastChar)) {
                screen.value += value;
            } else {
                if (value in numbersMassive) {
                    screen.value += value;

                }
            }

        } else {
            if (!operationsMassive.slice(1).includes(value)) {
                screen.value = value;
            }
        }
        evaluateResultOnScreen(screen, resultScreen)
}

function clickButton(element) {
        // Get needed DOM elements
        let screen = document.getElementById("screen");
        let resultScreen = document.getElementById('resultScreen')
        let elementType = element.getAttribute('class');
        let elementValue = element.value;


        // Updates the screen by directing it to the corresponding function.
        buttonAction[elementType](elementValue, screen, resultScreen);

}
