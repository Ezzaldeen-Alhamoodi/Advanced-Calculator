// آلة حاسبة متقدمة - JavaScript
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
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.updateDisplay();
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
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// تهيئة الآلة الحاسبة
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

// إضافة event listeners للأزرار
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.getAttribute('data-number'));
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.getAttribute('data-operation'));
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute();
});

document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear();
});

document.querySelector('.delete').addEventListener('click', () => {
    calculator.delete();
});

// دعم لوحة المفاتيح
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        calculator.appendNumber(event.key);
    }
    
    if (event.key === '.') {
        calculator.appendNumber('.');
    }
    
    if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key === '+' ? '+' : '−');
    }
    
    if (event.key === '*' || event.key === 'x') {
        calculator.chooseOperation('×');
    }
    
    if (event.key === '/') {
        calculator.chooseOperation('÷');
    }
    
    if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
    }
    
    if (event.key === 'Escape') {
        calculator.clear();
    }
    
    if (event.key === 'Backspace') {
        calculator.delete();
    }
});

// تأثيرات إضافية
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = '';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

console.log('🚀 الآلة الحاسبة جاهزة للعمل! تم التطوير بواسطة Ezzaldeen Alhamoodi');