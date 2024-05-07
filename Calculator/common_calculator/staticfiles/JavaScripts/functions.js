function writeValueOnScreen(value, screen, resultScreen) {
    validateScreen(value, screen, resultScreen)
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
    'operation': writeValueOnScreen
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
    if (screen.value.length !==0){
        let lastChar = screen.value.charAt(screen.value.length - 1)
        if (operationsMassive.includes(lastChar)) {
            resultScreen.value = '';
        } else {
            resultScreen.value = eval(screen.value);
    }
    }
    else {
        resultScreen.value = '';
    }
}

function validateScreen(value, screen, resultScreen) {
    if (screen.value.length !== 0) {

        let lastChar = screen.value.charAt(screen.value.length - 1)
        if (numbersMassive.concat(dot).includes(lastChar)) {
            screen.value += value;
        }
        else {
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
