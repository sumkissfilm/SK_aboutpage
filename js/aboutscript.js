/* ===== Variables and Constants ===== */
const scrollThreshold = 100;
const animationDelay = 200;
const fadeInOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

/* ===== DOM Elements ===== */
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const imageItems = document.querySelectorAll('.body004 .image-item');
const instagramGrid = document.querySelector('.instagram-grid');
const dropdowns = document.querySelectorAll('.dropdown');
const hero = document.querySelector('.hero');

const instagramPosts = [
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed'
];

/* ===== Functions ===== */
function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenuOnClick() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function handleImageAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

function loadInstagramPosts() {
    if (!instagramGrid) return;
    
    instagramPosts.forEach((postUrl, index) => {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-permalink', postUrl);
        blockquote.setAttribute('data-instgrm-version', '14');
        instagramGrid.appendChild(blockquote);
    });
}

function initializeInstagram() {
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

function handleDropdownClick(e) {
    if (window.innerWidth <= 900) {
        e.preventDefault();
        const dropdown = e.currentTarget;
        dropdown.classList.toggle('active');
    }
}

function handleHeaderScroll() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/* ===== Event Listeners ===== */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化漢堡選單
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // 初始化導航連結
    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenuOnClick);
        });
    }

    // 初始化下拉選單
    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', handleDropdownClick);
        });
    }

    // 初始化滾動事件
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleHeaderScroll);

    // 初始化 Instagram
    loadInstagramPosts();
    initializeInstagram();

    // 導航欄滾動效果
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 初始檢查滾動狀態
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    }

    // 點擊導航鏈接時平滑滾動到目標位置
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 在移動設備上，點擊後關閉導航菜單
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Handle scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('.member-info').style.transform = 'translateY(0)';
        });

        member.addEventListener('mouseleave', () => {
            member.querySelector('.member-info').style.transform = 'translateY(100%)';
        });
    });

    // Story image hover effect
    const storyImages = document.querySelectorAll('.story-image');
    
    storyImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.querySelector('img').style.transform = 'scale(1.05)';
        });

        image.addEventListener('mouseleave', () => {
            image.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact button hover effect
    const contactButton = document.querySelector('.btn-contact');
    if (contactButton) {
        contactButton.addEventListener('mouseenter', () => {
            contactButton.style.transform = 'translateY(-2px)';
        });

        contactButton.addEventListener('mouseleave', () => {
            contactButton.style.transform = 'translateY(0)';
        });
    }
});