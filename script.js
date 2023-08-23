class Calculator {
    constructor(display) {
        this.display = display;
        this.clear() 
    }

    updateDisplay() {
        let toDisplay
        switch(this.currentPos) {
            case "nb1":
                toDisplay = this.nb1;
                break;
            case "nb2":
                toDisplay = this.nb2;
                break;
            case "operator":
                toDisplay = this.operator;
                break;
        }
        this.display.textContent = toDisplay;
    }

    clear() {
        this.nb1 = "";
        this.nb2 = "";
        this.operator = "";
        this.currentPos = "nb1";
        this.updateDisplay();
    }

    add(a, b) {
        return a + b
    }

    substract(a, b) {
        return a - b
    }

    multiply(a, b) {
        return a * b
    }

    divide(a, b) {
        if(b == 0) return "Divsion by Zero"
        return Math.round((a / b)*100) / 100 // Keep last two decimals
    }

    operate() {
        switch(this.operator) {
            case "+":
                return add(this.nb1, this.nb2)
            case "-":
                return substract(this.nb1, this.nb2)
            case "*":
                return multiply(this.nb1, this.nb2)
            case "/":
                return divide(this.nb1, this.nb2)
        }
    }
}

const display = document.querySelector("#display")
const calculator = new Calculator(display)
