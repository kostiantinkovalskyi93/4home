const contactsBurger = document.querySelector("#header__contacts-burger");
const contactsBurgerList = document.querySelector("#contacts-burger-list");
const headerNavBurger = document.querySelector("#header__nav-burger");
const navBurgerList = document.querySelector("#nav-burger-list");
const faqSection = document.querySelector("#faq__section");

function closeAllMenus() {
    if(contactsBurgerList) contactsBurgerList.classList.remove("contacts-burger-activ");
    if(navBurgerList) navBurgerList.classList.remove("nav-burger-activ");
}

if (contactsBurger) {
contactsBurger.addEventListener("click", (e) => {
    e.stopPropagation();
    contactsBurgerList.classList.toggle("contacts-burger-activ");
    navBurgerList.classList.remove("nav-burger-activ");
});
}

if(headerNavBurger) {
headerNavBurger.addEventListener("click", (e) => {
    e.stopPropagation();
    navBurgerList.classList.toggle("nav-burger-activ");
    contactsBurgerList.classList.remove("contacts-burger-activ");
});
}
if(document.body.contains(contactsBurger) || document.body.contains(headerNavBurger)) {
document.addEventListener("click", (e) => {
    if (!contactsBurger.contains(e.target) && !contactsBurgerList.contains(e.target) &&
        !headerNavBurger.contains(e.target) && !navBurgerList.contains(e.target)) {
        closeAllMenus();
    }
});
}
// Секція питання-відповіді

function closeAllAnswers() {
    const allAnswers = faqSection.querySelectorAll('.faq__section-answer');
    const allHamburgers = faqSection.querySelectorAll('.hamburger');
    const allItems = faqSection.querySelectorAll('.faq__section-item');

    allAnswers.forEach(ans => ans.style.display = 'none');
    allHamburgers.forEach(hamb => hamb.classList.remove('is-active'));
    allItems.forEach(item => item.classList.remove('active'));
}
if (faqSection) {
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
}
// Секція форм

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
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
}
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contact-form');
    const phoneInput = document.querySelector('#phone');

    if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
    }

    if(form){
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
            alert('Щось пішло не так. Спробуйте ще раз.');
        });
    });
}
});


// Футер сайту

const scrollTopBtn = document.querySelector('#scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            scrollTopBtn.style.display = 'none';
        }, 300);
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// slick - slider
if (typeof jQuery === 'undefined') {
    console.log('jQuery не завантажено!');
} else {
    console.log('jQuery завантажено, версія: ' + jQuery.fn.jquery);
$(document).ready(function(){
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true
        });
    }); 
}