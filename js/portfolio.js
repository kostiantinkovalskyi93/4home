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

// Кнопка прокрутки вгору
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

// Slick Slider для сторінок із слайдерами та повноекранний перегляд
if (typeof jQuery !== "undefined" && typeof $.fn.slick !== "undefined") {
    $(document).ready(function () {
        // Перебираємо всі блоки .category__slider-block
        $(".category__slider-block").each(function (index) {
            const $sliderFor = $(this).find(".slider-for");
            const $sliderNav = $(this).find(".slider-nav");
            
            // Спочатку додаємо унікальні класи для зв'язки слайдерів
            $sliderFor.addClass(`slider-for-${index}`);
            $sliderNav.addClass(`slider-nav-${index}`);
            
            // Потім ініціалізуємо головний слайдер
            $sliderFor.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: `.slider-nav-${index}`,
            });
            
            // Ініціалізація навігаційного слайдера
            $sliderNav.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: `.slider-for-${index}`,
                dots: true,
                centerMode: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
            
            // Обробка кліку на зображення в slider-for
            $sliderFor.on("click", "img", function (e) {
                e.preventDefault();
                e.stopPropagation();
                const $modal = $("#fullscreenModal");
                const $modalSlider = $("#fullscreenModalSlider");
                const images = $sliderFor.find("img").map(function () {
                    return $(this).attr("src");
                }).get();
                const clickedIndex = $sliderFor.slick("slickCurrentSlide");
                
                // Очищаємо попередній слайдер
                if ($modalSlider.hasClass("slick-initialized")) {
                    $modalSlider.slick("unslick");
                }
                $modalSlider.empty();
                
                // Додаємо зображення до модального слайдера
                images.forEach((src) => {
                    $modalSlider.append(
                        `<div><img src="${src}" alt="Зображення шафи-купе"></div>`
                    );
                });
                
                // Відкриваємо модальне вікно
                $modal.addClass("fullscreen-modal--active");
                
                // Ініціалізація повноекранного слайдера
                setTimeout(() => {
                    $modalSlider.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: true,
                        initialSlide: clickedIndex,
                        infinite: true,
                    });
                    // Додаємо фокус на модальне вікно для обробки клавіатури
                    $modalSlider.focus();
                }, 100);
            });
        });
        
        // Закриття модального вікна кнопкою
        $("#fullscreenModalClose").on("click", function () {
            const $modal = $("#fullscreenModal");
            const $modalSlider = $("#fullscreenModalSlider");
            $modal.removeClass("fullscreen-modal--active");
            if ($modalSlider.hasClass("slick-initialized")) {
                $modalSlider.slick("unslick");
            }
        });
        
        // Закриття модального вікна кліком за межі зображення
        $("#fullscreenModal").on("click", function (e) {
            const $modal = $(this);
            const $modalContent = $(".fullscreen-modal__content");
            if (!$modalContent.is(e.target) && $modalContent.has(e.target).length === 0) {
                const $modalSlider = $("#fullscreenModalSlider");
                $modal.removeClass("fullscreen-modal--active");
                if ($modalSlider.hasClass("slick-initialized")) {
                    $modalSlider.slick("unslick");
                }
            }
        });
        
        // Закриття за допомогою клавіші Escape та перелистування стрілками
        $(document).on("keydown", function (e) {
            const $modal = $("#fullscreenModal");
            const $modalSlider = $("#fullscreenModalSlider");
            if ($modal.hasClass("fullscreen-modal--active")) {
                if (e.key === "Escape") {
                    $modal.removeClass("fullscreen-modal--active");
                    if ($modalSlider.hasClass("slick-initialized")) {
                        $modalSlider.slick("unslick");
                    }
                } else if (e.key === "ArrowLeft") {
                    // Перелистування вліво
                    if ($modalSlider.hasClass("slick-initialized")) {
                        $modalSlider.slick("slickPrev");
                    }
                } else if (e.key === "ArrowRight") {
                    // Перелистування вправо
                    if ($modalSlider.hasClass("slick-initialized")) {
                        $modalSlider.slick("slickNext");
                    }
                }
            }
        });
    });
} else {
    console.warn("jQuery або Slick Slider не завантажено. Слайдери не будуть ініціалізовані.");
}

// FAQ секція
const faqSection = document.querySelector("#faq__section");
if (faqSection) {
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
            // Клік НЕ по питанню - виправлено, щоб не закривати відповіді 
            // при кліку на будь-яку частину FAQ секції
            const insideAnswer = e.target.closest('.faq__section-answer');
            if (!insideAnswer) {
                closeAllAnswers();
            }
        }
    });
}