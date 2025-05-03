// Function to update the copyright year
function updateCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Add event listener to run scripts after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Menu Toggle Code ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.error("Menu toggle button or navigation element not found!");
    }
    // --- End Existing Code ---

    // Update copyright year
    updateCopyrightYear();

    // You could add more JS here, e.g., simple scroll animations
    // Example: Basic Fade-in effect for cards (requires CSS setup)
    /*
    const cards = document.querySelectorAll('.game-card, .plugin-card, .team-card, .news-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% visible

    cards.forEach(card => {
        // Initial state for animation (requires CSS: opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease;)
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    */

}); // End DOMContentLoaded