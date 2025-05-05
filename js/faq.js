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
            const insideAnswer = e.target.closest('.faq__section-answer');
            if (!insideAnswer) {
                closeAllAnswers();
            }
        }
    });
}