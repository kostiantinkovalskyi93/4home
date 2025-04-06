const contactsBurger = document.querySelector("#header__contacts-burger");
const contactsBurgerList = document.querySelector("#contacts-burger-list");
const headerNavBurger = document.querySelector("#header__nav-burger");
const navBurgerList = document.querySelector("#nav-burger-list");
const faqSection = document.querySelector("#faq__section");

function closeAllMenus() {
    contactsBurgerList.classList.remove("contacts-burger-activ");
    navBurgerList.classList.remove("nav-burger-activ");
}

contactsBurger.addEventListener("click", (e) => {
    e.stopPropagation();
    contactsBurgerList.classList.toggle("contacts-burger-activ");
    navBurgerList.classList.remove("nav-burger-activ");
});

headerNavBurger.addEventListener("click", (e) => {
    e.stopPropagation();
    navBurgerList.classList.toggle("nav-burger-activ");
    contactsBurgerList.classList.remove("contacts-burger-activ");
});

document.addEventListener("click", (e) => {
    if (!contactsBurger.contains(e.target) && !contactsBurgerList.contains(e.target) &&
        !headerNavBurger.contains(e.target) && !navBurgerList.contains(e.target)) {
        closeAllMenus();
    }
});

function closeAllAnswers() {
    const allAnswers = faqSection.querySelectorAll('.faq__section-answer');
    const allHamburgers = faqSection.querySelectorAll('.hamburger');
    const allItems = faqSection.querySelectorAll('.faq__section-item');

    allAnswers.forEach(ans => ans.style.display = 'none');
    allHamburgers.forEach(hamb => hamb.classList.remove('is-active'));
    allItems.forEach(item => item.classList.remove('active'));
}

faqSection.addEventListener('click', (e) => {
    const question = e.target.closest('.faq__section-question');

    if (question) {
        const answer = question.nextElementSibling;
        const hamburger = question.querySelector('.hamburger');
        const faqItem = question.parentElement;

        if (answer && hamburger && faqItem) {
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                hamburger.classList.remove('is-active');
                faqItem.classList.remove('active');
            } else {
                closeAllAnswers();
                answer.style.display = 'block';
                hamburger.classList.add('is-active');
                faqItem.classList.add('active');
            }
        }
    } else {
        closeAllAnswers();
    }
});

const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.querySelector('#name').value,
        phone: document.querySelector('#phone').value,
        email: document.querySelector('#email').value,
        comment: document.querySelector('#comment').value
    };

    console.log('Form Data:', formData);

    fetch('https://example.com/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Ваша заявка успішно відправлена!');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Виникла помилка при відправленні заявки.');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contact-form');
    const phoneInput = document.querySelector('#phone');

    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const phoneValue = phoneInput.value.trim();

        if (!/^\d{10,13}$/.test(phoneValue)) {
            alert('Будь ласка, введіть коректний номер телефону (тільки цифри, 10-13 символів)');
            return;
        }

        const formData = new FormData(form);

        fetch('send-form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка при відправці форми');
            }
            return response.text();
        })
        .then(data => {
            alert('Дякуємо! Заявку відправлено ✅');
            form.reset();
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Упс 😬 Щось пішло не так. Спробуйте ще раз.');
        });
    });
});