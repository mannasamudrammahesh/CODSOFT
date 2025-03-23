
        class Calculator {
            constructor(previousOperandElement, currentOperandElement) {
                this.previousOperandElement = previousOperandElement;
                this.currentOperandElement = currentOperandElement;
                this.clear();
            }

            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
                this.shouldResetScreen = false;
                this.justComputed = false;
                this.fullExpression = '';
            }

            delete() {
                if (this.currentOperand === '0') return;
                if (this.currentOperand.length === 1) {
                    this.currentOperand = '0';
                } else {
                    this.currentOperand = this.currentOperand.slice(0, -1);
                }
            }

            appendNumber(number) {
                if (this.justComputed) {
                    this.clear();
                    this.justComputed = false;
                }

                if (this.shouldResetScreen) {
                    this.currentOperand = '';
                    this.shouldResetScreen = false;
                }

                if (number === '.' && this.currentOperand.includes('.')) return;

                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number;
                } else {
                    this.currentOperand += number;
                }
            }

            chooseOperation(operation) {
                if (this.currentOperand === '') return;

                this.justComputed = false;

                if (this.previousOperand !== '' && this.currentOperand !== '') {
                    this.compute();
                }

                this.operation = operation;
                this.fullExpression = this.previousOperand ?
                    `${this.previousOperand} ${this.operation} ` :
                    `${this.currentOperand} ${this.operation} `;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
                this.shouldResetScreen = false;
            }

            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);

                if (isNaN(prev) || isNaN(current)) return;

                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        if (current === 0) {
                            this.currentOperandElement.textContent = 'Error';
                            setTimeout(() => {
                                this.clear();
                                this.updateDisplay();
                            }, 1500);
                            return;
                        }
                        computation = prev / current;
                        break;
                    default:
                        return;
                }

            
                this.fullExpression = `${this.fullExpression}${this.currentOperand} = `;

           
                this.currentOperand = this.formatDisplayNumber(computation);
                this.operation = undefined;
                this.previousOperand = '';
                this.shouldResetScreen = true;
                this.justComputed = true;
            }

            formatDisplayNumber(number) {
              
                return number.toString();
            }

            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];

                let integerDisplay;
                if (isNaN(integerDigits)) {
                    integerDisplay = '0';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
                }

                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }

            updateDisplay() {
             
                this.currentOperandElement.textContent = this.currentOperand === '' ? '0' : this.getDisplayNumber(this.currentOperand);

     
                if (this.justComputed) {
                    this.previousOperandElement.textContent = this.fullExpression;
                    return;
                }

               
                if (this.operation != null) {
                    this.previousOperandElement.textContent =
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else if (this.previousOperand) {
                    this.previousOperandElement.textContent = this.getDisplayNumber(this.previousOperand);
                } else {
                    this.previousOperandElement.textContent = '';
                }
            }

            
            handleKeyboardInput(key) {
                if (/[0-9]/.test(key)) {
                    this.appendNumber(key);
                    this.updateDisplay();
                } else if (key === '.') {
                    this.appendNumber(key);
                    this.updateDisplay();
                } else if (key === '+' || key === '-') {
                    this.chooseOperation(key);
                    this.updateDisplay();
                } else if (key === '*') {
                    this.chooseOperation('×');
                    this.updateDisplay();
                } else if (key === '/') {
                    this.chooseOperation('÷');
                    this.updateDisplay();
                } else if (key === 'Enter' || key === '=') {
                    this.compute();
                    this.updateDisplay();
                } else if (key === 'Backspace') {
                    this.delete();
                    this.updateDisplay();
                } else if (key === 'Escape') {
                    this.clear();
                    this.updateDisplay();
                }
            }
        }

       
        const previousOperandElement = document.getElementById('previous-operand');
        const currentOperandElement = document.getElementById('current-operand');
        const calculator = new Calculator(previousOperandElement, currentOperandElement);

        
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.textContent);
                calculator.updateDisplay();
            });
        });

        document.querySelectorAll('[data-operation]').forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.textContent);
                calculator.updateDisplay();
            });
        });

        document.querySelector('[data-equals]').addEventListener('click', () => {
            calculator.compute();
            calculator.updateDisplay();
        });

        document.querySelector('[data-all-clear]').addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        });

        document.querySelector('[data-delete]').addEventListener('click', () => {
            calculator.delete();
            calculator.updateDisplay();
        });

       
        document.addEventListener('keydown', (event) => {
            calculator.handleKeyboardInput(event.key);
        });

       
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px)';
                }, 100);
            });
        });
    