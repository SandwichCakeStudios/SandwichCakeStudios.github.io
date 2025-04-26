document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class on the navigation menu
            mainNav.classList.toggle('active');

            // Toggle the aria-expanded attribute for accessibility
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.error("Menu toggle button or navigation element not found!");
    }
});