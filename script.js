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
            if(self.nb1 == "Division by Zero") {
                self.nb1 = "";
            } else {
                self.currentPos = "nb2"
            }
        }
    }

    addAction() {
        const action = this.getAttribute("data-action")
        switch(action) {
            case "float":
                self.addDecimal()
                break;
        }
        self.updateDisplay()
    }

    addDecimal() {
        if(this.currentPos == "nb1") {
            if(!this.nb1.includes(".")) {
                this.nb1 = this.nb1 + "."
            }
        } else if(this.currentPos == "nb2") {
            if(!this.nb2.includes(".")) {
                this.nb2 = this.nb2 + "."
            }
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
        if(b == 0) return "Division by Zero"
        return Math.round((+a / +b)*100) / 100 // Keep last two decimals
    }

    operate() {
        if(this.nb1 == ".") this.nb1 = 0
        if(this.nb2 == ".") this.nb2 = 0
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

const actionBtns = [...document.querySelectorAll("button[data-action]")]
actionBtns.forEach(btn => btn.addEventListener("click", calculator.addAction))
