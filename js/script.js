function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const toggleBtn = element.querySelector('.toggle-btn');
    const faqItem = element.parentElement;

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        toggleBtn.textContent = '+';
        faqItem.classList.remove('active');
    } else {
        answer.style.display = 'block';
        toggleBtn.textContent = '-';
        faqItem.classList.add('active');
    }
}