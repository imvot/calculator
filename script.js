function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if(b == 0) return "Divsion by Zero"
    return Math.round((a / b)*100) / 100 // Keep last two decimals
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            add(a, b)
            break;
        case "-":
            substract(a, b)
            break;
        case "*":
            multiply(a, b)
            break;
        case "/":
            divide(a, b)
            break;
    }
}
