// Base operatons
const operations = {
    add: {
        function: (a, b) => a + b,
        symbol: "+",
    },
    subtract: {
        function: (a, b) => a - b,
        symbol: "-",
    },
    multiply: {
        function: (a, b) => a * b,
        symbol: "*",
    },
    divide: {
        function: (a, b) => a / b,
        symbol: "/",
    },
}

const keys = {
    0: {
        isNumber: true,
        number: "0",
    },

    1: {
        isNumber: true,
        number: "1",
    },

    2: {
        isNumber: true,
        number: "2",
    },

    3: {
        isNumber: true,
        number: "3",
    },

    4: {
        isNumber: true,
        number: "4",
    },

    5: {
        isNumber: true,
        number: "5",
    },

    6: {
        isNumber: true,
        number: "6",
    },

    7: {
        isNumber: true,
        number: "7",
    },

    8: {
        isNumber: true,
        number: "8",
    },

    9: {
        isNumber: true,
        number: "9"
    },

    c: {
        operation: "clear"
    },

    Backspace: {
        operation: "delete"
    },

    "%": {
        operation: "percentage"
    },

    "/": {
        operation: "divide"
    },

    "*": {
        operation: "multiply"
    },

    x: {
        operation: "multiply"
    },

    "-": {
        operation: "subtract"
    },

    "+": {
        operation: "add"
    },

    "=": {
        operation: "sum"
    },

    Enter: {
        operation: "sum"
    },

    ".": {
        isNumber: true,
        number: "."
    },

    ",": {
        isNumber: true,
        number: "."
    }

}

const resultBox = document.querySelector(".result");
const historyBox = document.querySelector(".history")

const operate = (a, b, operation) => operations[operation](a, b)

const clickHandler = (event) => main( event.target.dataset.isnumber ? {isNumber: true, number: event.target.dataset.number } : { operation: event.target.dataset.operation});

document.querySelectorAll('.button').forEach((button) => button.addEventListener('click', clickHandler));
document.addEventListener('keydown', (event) => keys[event.key] ? main(keys[event.key]) : undefined);



let cacheSum = 0;
let isSum = false;
let cacheOperation = null;

function main(input) {
    if (input.isNumber) {
        if (resultBox.textContent === "0" || isSum) { 
            resultBox.textContent = input.number; 
            if (isSum) historyBox.textContent = "";
            isSum = false;
        }
        else if (resultBox.textContent.length === 10) return;
        else if (input.number === "." && resultBox.textContent.includes('.')) alert("You can't have two commas");
        else resultBox.textContent += input.number;
        return
    }
    if (operations[input.operation]) {
        isSum = false;
        if (!cacheOperation) cacheOperation = "add";
        cacheSum = operations[cacheOperation].function(cacheSum, parseFloat(resultBox.textContent));
        historyBox.textContent = cacheSum + " " + operations[input.operation].symbol;
        cacheOperation = input.operation;
        resultBox.textContent = 0;
        return
    } 

    switch (input.operation) {
        case "sum":
            if (isSum) return
            isSum = true;
            if (!cacheOperation) cacheOperation = "add";
            historyBox.textContent += " " + resultBox.textContent;
            resultBox.textContent = operations[cacheOperation].function(cacheSum, parseFloat(resultBox.textContent));
            if (resultBox.textContent.length > 10) {
                let temp = resultBox.textContent.split("e");
                let significativeNumbers = temp[0].split(".")
                if (significativeNumbers[0].length >= 7) {
                    resultBox.textContent = resultBox.textContent.slice(0,7) + "e" + (significativeNumbers[0].length - 7 + (parseInt(temp[1]) ? parseInt(temp[1]) : 0));
                } else {
                    resultBox.textContent = significativeNumbers[0] + "." + significativeNumbers[1].slice(0, 6 - significativeNumbers[0].length) + (temp[1] ? "e" + temp[1] : "");
                }
            } 
            cacheSum = 0;
            cacheOperation = null;
            break;

        case "clear":
            isSum = false;
            cacheOperation = null;
            cacheSum = 0;
            resultBox.textContent = 0;
            historyBox.textContent = "";
            break;
        
        case "delete":
            isSum = false;
            resultBox.textContent = resultBox.textContent.length > 1 ? resultBox.textContent.slice(0,-1) : 0;
            break
        
        case "percentage":
            // Copy pasted the code form sum cause I'm tired, more lines but doesn't add complexity. Need to multiply by hundred.
            if (isSum) return
            isSum = true;
            if (!cacheOperation) cacheOperation = "add";
            historyBox.textContent += " " + resultBox.textContent;
            resultBox.textContent = (operations[cacheOperation].function(cacheSum, parseFloat(resultBox.textContent)) * 100);
            if (resultBox.textContent.length > 10) {
                let temp = resultBox.textContent.split("e");
                let significativeNumbers = temp[0].split(".")
                if (significativeNumbers[0].length >= 7) {
                    resultBox.textContent = resultBox.textContent.slice(0,7) + "e" + (significativeNumbers[0].length - 7 + (parseInt(temp[1]) ? parseInt(temp[1]) : 0));
                } else {
                    resultBox.textContent = significativeNumbers[0] + "." + significativeNumbers[1].slice(0, 6 - significativeNumbers[0].length) + (temp[1] ? "e" + temp[1] : "");
                }
            } 
            cacheSum = 0;
            cacheOperation = null;
            break;
    }
}