document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Proszę wypełnić wszystkie pola.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Podaj poprawny adres e-mail.');
            return;
        }

        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');

        contactForm.reset();
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    if (localStorage.getItem('darkmode') === 'true') {
        document.body.classList.add('dark');
    }
});