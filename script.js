class Calculator {
    constructor(display) {
        this.display = display;
        self = this;
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

    addNb() {
        const number = this.getAttribute("data-number")

        if(self.currentPos == "operator") self.currentPos = "nb2"

        if(self.currentPos == "nb1") {
            self.nb1 += number
        } else if(self.currentPos == "nb2") {
            self.nb2 += number
        }
        self.updateDisplay()
    }

    addOperator() {
        const operator = this.getAttribute("data-operator")
        if(self.nb1 && operator != "=") {
            self.operator = operator;
            self.currentPos = "operator";
            self.updateDisplay()
        }
        if(self.nb1 && self.nb2) {
            self.nb1 = self.operate();
            self.nb2 = "";
            self.currentPos = "nb1"
            self.updateDisplay()
            self.currentPos = "nb2"
        }
    }

    add(a, b) {
        return +a + +b
    }

    substract(a, b) {
        return +a - +b
    }

    multiply(a, b) {
        return +a * +b
    }

    divide(a, b) {
        if(b == 0) return "Divsion by Zero"
        return Math.round((+a / +b)*100) / 100 // Keep last two decimals
    }

    operate() {
        switch(this.operator) {
            case "+":
                return this.add(this.nb1, this.nb2)
            case "-":
                return this.substract(this.nb1, this.nb2)
            case "*":
                return this.multiply(this.nb1, this.nb2)
            case "/":
                return this.divide(this.nb1, this.nb2)
        }
    }
}

const display = document.querySelector("#display")
const calculator = new Calculator(display)

const nbBtns = [...document.querySelectorAll("button[data-number]")]
nbBtns.forEach(btn => btn.addEventListener("click", calculator.addNb))

const operatorBtns = [...document.querySelectorAll("button[data-operator]")]
operatorBtns.forEach(btn => btn.addEventListener("click", calculator.addOperator))
