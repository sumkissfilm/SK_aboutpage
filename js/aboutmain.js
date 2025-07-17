// Header Background Change on Scroll
const header = document.querySelector('header');
const hero = document.querySelector('.hero');

function handleHeaderScroll() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    // Header Background Change on Scroll
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');

    function handleHeaderScroll() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.scrollY > heroBottom) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // Navigation Menu Setup
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navOverlay = document.querySelector('.nav-overlay');
    const dropdowns = document.querySelectorAll('.dropdown, .nav-item.dropdown');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Debug output
    console.log('初始化菜單...');
    console.log('菜單項數量:', dropdowns.length);
    dropdowns.forEach((dropdown, i) => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu ? menu.querySelectorAll('li') : [];
        console.log(`菜單項 ${i+1}:`, link ? link.textContent : '無鏈接');
        console.log(`子菜單項數量:`, items.length);
    });

    // Mobile menu toggle
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            navbarCollapse.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navbarCollapse && navbarToggler) {
            const isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarToggler.classList.add('collapsed');
                navbarCollapse.classList.remove('show');
            }
        }
    });

    // Dropdown menu functionality
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                // Only prevent default on mobile
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                            const otherMenu = item.querySelector('.dropdown-menu');
                            if (otherMenu) otherMenu.classList.remove('show');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    menu.classList.toggle('show');
                }
            });
        }
    });

    // Handle dropdown menu links
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navContainer) navContainer.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            if (navbarCollapse) navbarCollapse.classList.remove('show');
            if (navbarToggler) navbarToggler.classList.add('collapsed');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
            });
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            if (navContainer) navContainer.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            if (navbarCollapse) navbarCollapse.classList.remove('show');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
            });
        }
    });

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation observer setup
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

        document.querySelectorAll('.service-card, .work-item').forEach(el => {
        observer.observe(el);
    });
}); 