// Netrave Modern Website Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 2. Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Form Validation & Local Handling (Optional enhancement for FormSubmit)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            // Visual feedback
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Collect form data
            const formData = new FormData(contactForm);

            // Send via AJAX
            fetch("https://formsubmit.co/ajax/netrave@zohomail.in", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Redirect to success page on success
                    window.location.href = 'success.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Something went wrong. Please try again.");
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                    btn.disabled = false;
                });
        });
    }
});
