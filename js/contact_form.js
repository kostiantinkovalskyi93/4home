const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^+0-9]/g, '');

        if (this.value.includes('+') && !this.value.startsWith('+380')) {
            this.value = this.value.replace('+', '');
        }

        if (this.value.startsWith('+380') && this.value.length > 13) {
            this.value = this.value.substring(0, 13);
        } else if (!this.value.startsWith('+380') && this.value.length > 10) {
            this.value = this.value.substring(0, 10);
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (this.value === '+' || this.value === '') {
            this.value = '';
        }
    });