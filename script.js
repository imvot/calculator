class Calculator {
    constructor(display) {
        this.display = display;
        self = this;
        this.clear() 
    }

    updateDisplay() {
        let toDisplay
        switch(this.currentNb) {
            case "nb1":
                toDisplay = this.nb1;
                break;
            case "nb2":
                toDisplay = this.nb2;
                break;
        }
        this.display.textContent = toDisplay;
    }

    clear() {
        this.nb1 = "";
        this.nb2 = "";
        this.operator = "";
        this.currentNb = "nb1";
        this.updateDisplay();
    }

    addNb() {
        const number = this.getAttribute("data-number")

        if(self.operator) {
            self.currentNb = "nb2";
        }

        if(!self[self.currentNb].endsWith("%")) {
            self[self.currentNb] += number;
        }
        
        self.updateDisplay()
    }

    addOperator() {
        const operator = this.getAttribute("data-operator")

        if(operator != "=" && self.nb1) {
            self.operator = operator;
        }

        if(self.nb1 && self.nb2) {
            self.nb1 = self.operate().toString();
            self.nb2 = "";
            self.currentNb = "nb1";
            self.updateDisplay();
            if(self.nb1 == "Division by Zero") {
                self.nb1 = "";
            } 
            if(operator == "=") self.operator = "";
        }
    }

    addAction() {
        const action = this.getAttribute("data-action")
        switch(action) {
            case "clear":
                self.clear()
                break;
            case "symbol":
                self.inverseSymbol()
                break;
            case "percentage":
                self.addPercentage()
                break;
            case "backspace":
                self.removeLastChar()
                break;
            case "float":
                self.addDecimal()
                break;

        }
        self.updateDisplay()
    }

    addDecimal() {
        if(!this[this.currentNb].includes(".")) {
            this[this.currentNb] = this[this.currentNb] + ".";
        }
    }

    addPercentage() {
        if(!this[this.currentNb].includes("%")) {
            this[this.currentNb] = this[this.currentNb] + "%";
        }
    }

    replacePercentage(nb) {
        if(nb.endsWith("%")) {
            return +(nb.replace("%", "")) / 100
        }
        return nb
    }
            
    inverseSymbol() {
        this[this.currentNb] *= -1;
    }

    removeLastChar() {
        this[this.currentNb] = this[this.currentNb].slice(0, -1);
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
        this.nb1 = this.replacePercentage(this.nb1)
        this.nb2 = this.replacePercentage(this.nb2)
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

window.addEventListener("keydown", e => document.querySelector(`button[data-key~="${e.key}"]`).click());

const nbBtns = [...document.querySelectorAll("button[data-number]")]
nbBtns.forEach(btn => btn.addEventListener("click", calculator.addNb))

const operatorBtns = [...document.querySelectorAll("button[data-operator]")]
operatorBtns.forEach(btn => btn.addEventListener("click", calculator.addOperator))

const actionBtns = [...document.querySelectorAll("button[data-action]")]
actionBtns.forEach(btn => btn.addEventListener("click", calculator.addAction))
