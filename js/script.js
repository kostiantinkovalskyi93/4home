// function toggleAnswer(element) {
//     const answer = element.nextElementSibling;
//     const toggleBtn = element.querySelector('.toggle-btn');
//     const faqItem = element.parentElement;

//     if (answer.style.display === 'block') {
//         answer.style.display = 'none';
//         toggleBtn.textContent = '+';
//         faqItem.classList.remove('active');
//     } else {
//         answer.style.display = 'block';
//         toggleBtn.textContent = '-';
//         faqItem.classList.add('active');
//     }
// }

const contactsBurger = document.querySelector("#header__contacts-burger");
const contactsBurgerList = document.querySelector("#contacts-burger-list");
const headerNavBurger = document.querySelector("#header__nav-burger");
const navBurgerList = document.querySelector("#nav-burger-list");

contactsBurger.addEventListener("click", () => {
    contactsBurgerList.classList.toggle("contacts-burger-activ");
});

headerNavBurger.addEventListener("click", () => {
    navBurgerList.classList.toggle("nav-burger-activ");
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const hamburger = element.querySelector('.hamburger');
    const faqItem = element.parentElement;

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        hamburger.classList.remove('is-active');
        faqItem.classList.remove('active');
    } else {
        answer.style.display = 'block';
        hamburger.classList.add('is-active');
        faqItem.classList.add('active');
    }
}

$(document).ready(function(){
    $(".hamburger").click(function(){
        $(this).toggleClass("is-active");
    });
});

