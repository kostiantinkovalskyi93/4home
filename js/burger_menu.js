// Бургер-меню
const contactsBurger = document.querySelector("#header__contacts-burger");
const contactsBurgerList = document.querySelector("#contacts-burger-list");
const headerNavBurger = document.querySelector("#header__nav-burger");
const navBurgerList = document.querySelector("#nav-burger-list");

function closeAllMenus() {
    if (contactsBurgerList) {
        contactsBurgerList.classList.remove("contacts-burger-activ");
    }
    if (navBurgerList) {
        navBurgerList.classList.remove("nav-burger-activ");
    }
}

if (contactsBurger) {
    contactsBurger.addEventListener("click", (e) => {
        e.stopPropagation();
        contactsBurgerList.classList.toggle("contacts-burger-activ");
        if (navBurgerList) {
            navBurgerList.classList.remove("nav-burger-activ");
        }
    });
}

if (headerNavBurger) {
    headerNavBurger.addEventListener("click", (e) => {
        e.stopPropagation();
        navBurgerList.classList.toggle("nav-burger-activ");
        if (contactsBurgerList) {
            contactsBurgerList.classList.remove("contacts-burger-activ");
        }
    });
}

if (document.body.contains(contactsBurger) || document.body.contains(headerNavBurger)) {
    document.addEventListener("click", (e) => {
        if (
            !contactsBurger.contains(e.target) &&
            !contactsBurgerList.contains(e.target) &&
            !headerNavBurger.contains(e.target) &&
            !navBurgerList.contains(e.target)
        ) {
            closeAllMenus();
        }
    });
}

const scrollTopBtn = document.querySelector("#scrollTopBtn");
if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollTopBtn.style.display = "flex";
            scrollTopBtn.style.opacity = "1";
        } else {
            scrollTopBtn.style.opacity = "0";
            setTimeout(() => {
                scrollTopBtn.style.display = "none";
            }, 300);
        }
    });
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}