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