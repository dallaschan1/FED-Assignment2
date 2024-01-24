document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.menu-toggle-button');
    const toggleBtnIcon = document.querySelector('.menu-toggle-button i');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    toggleBtn.onclick = function () {
        console.log("Opening Navbar");
        hamburgerMenu.classList.toggle('open');
        const isOpen = hamburgerMenu.classList.contains('open');

        toggleBtnIcon.classList = isOpen
            ? 'fa solid fa-xmark'
            : 'fa-solid fa-bars';
    };
});