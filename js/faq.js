const faqData = [
    {
        question: "Який термін виготовлення меблів на замовлення?",
        answer: "Термін залежить від складності проєкту та обсягу замовлення. Зазвичай виготовлення кухонь, шаф чи столів займає від 3 до 6 тижнів. Точні строки ми узгодимо після затвердження дизайну."
    },
    {
        question: "Чи можна замовити меблі за моїми розмірами?",
        answer: "Так, ми спеціалізуємося на індивідуальних замовленнях. Усі меблі виготовляються за вашими розмірами та побажаннями."
    },
    {
        question: "Які матеріали ви використовуєте?",
        answer: "Ми працюємо з якісними матеріалами: ДСП, МДФ, натуральне дерево, шпон, а також фурнітурою від перевірених виробників (Blum, Hettich тощо). Ви можете обрати матеріали під свій бюджет."
    },
    {
        question: "Чи робите ви дизайн-проєкт перед виготовленням?",
        answer: "Так, ми пропонуємо розробку 3D-візуалізації, щоб ви могли побачити, як виглядатимуть меблі у вашому просторі. Послуга входить у вартість замовлення."
    },
    {
        question: "Як відбувається процес замовлення?",
        answer: "Ви залишаєте заявку, наш менеджер зв’язується з вами, потім ми проводимо заміри, розробляємо проєкт, узгоджуємо деталі та приступаємо до виготовлення."
    },
    {
        question: "Чи є у вас доставка та встановлення?",
        answer: "Так, ми доставляємо меблі та пропонуємо професійний монтаж. Вартість залежить від вашого місця розташування."
    },
    {
        question: "Яка гарантія на ваші меблі?",
        answer: "Ми надаємо гарантію від 1 до 3 років залежно від типу меблів та матеріалів."
    },
    {
        question: "Чи можна замовити лише одну тумбу чи стіл, а не цілий комплект?",
        answer: "Звісно, ми виготовляємо як окремі предмети, так і цілі гарнітури на ваш вибір."
    },
    {
        question: "Як розрахувати попередню вартість?",
        answer: "Для цього потрібно надати нам розміри, обрати матеріали та фурнітуру. Ми підготуємо детальний кошторис після консультації."
    },
    {
        question: "Чи враховуєте ви особливості приміщення (наприклад, нерівні стіни)?",
        answer: "Так, наші фахівці проводять заміри та адаптують меблі під особливості вашого простору."
    },
    {
        question: "Чи можна обрати колір і текстуру?",
        answer: "Так, у нас широкий вибір кольорів, текстур і покриттів. Ви можете підібрати все під свій інтер’єр."
    },
    {
        question: "Що робити, якщо мені не сподобається готовий виріб?",
        answer: "Ми узгоджуємо всі деталі на етапі проєктування. Якщо виникнуть проблеми, зв’яжіться з нами — ми завжди йдемо назустріч клієнтам."
    },
    {
        question: "Чи працюєте ви з нестандартними проєктами?",
        answer: "Так, ми готові реалізувати будь-які ідеї, включно з нестандартними формами чи розмірами."
    },
    {
        question: "Який мінімальний бюджет для замовлення кухні?",
        answer: "Вартість напряму залежить від розмірів, матеріалів та комплектації."
    },
    {
        question: "Чи можна подивитися зразки ваших робіт?",
        answer: "Так, на нашому сайті є портфоліо, а також ми можемо показати зразки матеріалів під час консультації."
    }
];

const faqSection = document.querySelector("#faq__section");

if (faqSection) {
    const faqContainer = document.createElement("div");
    faqContainer.classList.add("faq__section-container");

    const faqTitle = document.createElement("h2");
    faqTitle.classList.add("faq__section-subtitle");
    faqTitle.textContent = "Запитання та відповіді";
    faqContainer.appendChild(faqTitle);

    faqData.forEach((item, index) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq__section-item");

        const questionDiv = document.createElement("div");
        questionDiv.classList.add("faq__section-question");

        const threeCol = document.createElement("div");
        threeCol.classList.add("three", "col");

        const hamburger = document.createElement("div");
        hamburger.classList.add("hamburger");
        hamburger.id = `hamburger-${index + 10}`;

        for (let i = 0; i < 3; i++) {
            const line = document.createElement("span");
            line.classList.add("line");
            hamburger.appendChild(line);
        }

        threeCol.appendChild(hamburger);

        const questionText = document.createElement("span");
        questionText.textContent = item.question;

        questionDiv.appendChild(threeCol);
        questionDiv.appendChild(questionText);

        const answerDiv = document.createElement("div");
        answerDiv.classList.add("faq__section-answer");
        answerDiv.textContent = item.answer;
        answerDiv.style.display = "none";

        faqItem.appendChild(questionDiv);
        faqItem.appendChild(answerDiv);

        faqContainer.appendChild(faqItem);
    });

    faqSection.appendChild(faqContainer);

    function closeAllAnswers() {
        const allAnswers = faqSection.querySelectorAll(".faq__section-answer");
        const allHamburgers = faqSection.querySelectorAll(".hamburger");
        const allItems = faqSection.querySelectorAll(".faq__section-item");
        allAnswers.forEach(ans => ans.style.display = "none");
        allHamburgers.forEach(hamb => hamb.classList.remove("is-active"));
        allItems.forEach(item => item.classList.remove("active"));
    }

    faqSection.addEventListener("click", (e) => {
        const question = e.target.closest(".faq__section-question");
        if (question) {
            const answer = question.nextElementSibling;
            const hamburger = question.querySelector(".hamburger");
            const faqItem = question.parentElement;
            if (answer && hamburger && faqItem) {
                if (answer.style.display === "block") {
                    answer.style.display = "none";
                    hamburger.classList.remove("is-active");
                    faqItem.classList.remove("active");
                } else {
                    closeAllAnswers();
                    answer.style.display = "block";
                    hamburger.classList.add("is-active");
                    faqItem.classList.add("active");
                }
            }
        } else {
            const insideAnswer = e.target.closest(".faq__section-answer");
            if (!insideAnswer) {
                closeAllAnswers();
            }
        }
    });
}