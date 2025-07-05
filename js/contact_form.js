    const phoneInput = document.getElementById('phone');

    function formatPhoneNumber(value) {
        let cleanValue = value.replace(/[^+0-9]/g, '');

        if (!cleanValue.startsWith('+380')) {
            cleanValue = '+380' + cleanValue.replace(/[^0-9]/g, '');
        }

        let digits = cleanValue.slice(4);
        if (digits.length > 10) digits = digits.slice(0, 10);

        let formatted = '+380';
        if (digits.length > 0) formatted += ' ' + digits.slice(0, 2);
        if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
        if (digits.length > 5) formatted += ' ' + digits.slice(5, 7);
        if (digits.length > 7) formatted += ' ' + digits.slice(7, 10);
        return formatted;
    }

    phoneInput.addEventListener('input', function() {
        const cursorPosition = this.selectionStart;
        const oldValue = this.value;
        this.value = formatPhoneNumber(this.value);

        let newCursorPosition = cursorPosition;
        if (this.value.length > oldValue.length) {
            newCursorPosition += this.value.length - oldValue.length;
        }
        if (newCursorPosition < 4) newCursorPosition = 4;
        this.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    phoneInput.addEventListener('keydown', function(e) {
        if ((e.key === 'Backspace' || e.key === 'Delete') && this.selectionStart <= 4) {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (this.value === '+380') {
            this.value = '+380';
        }
    });