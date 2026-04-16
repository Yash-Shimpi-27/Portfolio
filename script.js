// Navigation and Mobile Menu
const navbar = document.getElementById('navbar');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

// Sticky Navbar Background & Logo Animation
const heroTitle = document.querySelector('.hero-title');
const sections = document.querySelectorAll('section');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const backToTopBtn = document.querySelector('.back-to-top');

let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // 1. Navbar Scrolled State
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // 2. Expand logo only when hero title goes out of view
            if (heroTitle) {
                const titleRect = heroTitle.getBoundingClientRect();
                if (titleRect.bottom < 80) {
                    navbar.classList.add('name-expanded');
                } else {
                    navbar.classList.remove('name-expanded');
                }
            }

            // 3. Active Link Highlighting
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });

            // 4. Scroll Progress
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (scrollProgressBar && windowHeight > 0) {
                scrollProgressBar.style.width = `${(scrollY / windowHeight) * 100}%`;
            }

            // 5. Back to Top Button
            if (backToTopBtn) {
                if (scrollY > 400) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }

            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

// Mobile Menu Toggle
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.querySelector('i').classList.remove('fa-times');
        mobileBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Typing Effect for Hero Section
const typingText = document.querySelector('.typing-text');
const roles = [
    "Electronics & Telecommunication Engineer",
    "IoT | Embedded | Data Systems"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Pause before typing next
    }

    setTimeout(type, typingDelay);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Scroll Reveal Animation via Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // If it's the skills section, animate progress bars
            if (entry.target.id === 'skills') {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }

            observer.unobserve(entry.target); // Optional: only animate once
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Active Link Highlighting (Moved to centralized Scroll Listener)

// Form Submission handling (Basic Mock)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        btn.disabled = true;

        // Submit via Web3Forms API
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm)
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                formStatus.innerHTML = '<span style="color: var(--accent-primary);"><i class="fas fa-check-circle"></i> Message sent successfully. I will get back to you soon.</span>';
                contactForm.reset();
            } else {
                console.log(response);
                formStatus.innerHTML = `<span style="color: var(--danger);"><i class="fas fa-exclamation-circle"></i> ${json.message || 'Error occurred.'}</span>`;
            }
        })
        .catch(error => {
            console.log(error);
            formStatus.innerHTML = '<span style="color: var(--danger);"><i class="fas fa-exclamation-circle"></i> Something went wrong! Please try again.</span>';
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    });
}

// ======= PREMIUM FEATURES =======

// Scroll Progress Bar & Back To Top Button (Moved to centralized Scroll Listener)

// 4. Mouse-Reactive Particles Background (Desktop + reduced on Mobile)
const isMobile = window.innerWidth <= 768;
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-bg')) {
    particlesJS('particles-bg', {
        particles: {
            number: { value: isMobile ? 40 : 80, density: { enable: true, value_area: 900 } },
            color: { value: ["#00ff88", "#00b8ff", "#7b61ff", "#00ffe0"] },
            shape: {
                type: ["circle", "triangle", "edge"],
                stroke: { width: 0, color: "#000" }
            },
            opacity: {
                value: 0.4,
                random: true,
                anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 4,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 140,
                color: "#00ff88",
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.8,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: !isMobile, mode: "grab" },
                onclick: { enable: !isMobile, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 180, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 },
                repulse: { distance: 150, duration: 0.4 }
            }
        },
        retina_detect: true
    });
}
