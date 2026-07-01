const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-odkazy a');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const sections = document.querySelectorAll('header, section');
const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('aktivni');
                const href = link.getAttribute('href');
                if (href && href.startsWith('#') && href.substring(1) === entry.target.id) {
                    link.classList.add('aktivni');
                }
            });
        }
    });
}, observerOptions);
sections.forEach(sec => observer.observe(sec));

const kontaktForm = document.getElementById('kontakt-formular');
const zpravaUspech = document.getElementById('zprava-uspech');

if (kontaktForm) {
    kontaktForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(kontaktForm);

        fetch(kontaktForm.action, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                zpravaUspech.classList.add('zobrazit');
                kontaktForm.reset();
                setTimeout(() => zpravaUspech.classList.remove('zobrazit'), 5000);
            }
        }).catch(error => console.error(error));
    });
}

const lightbox = document.getElementById('lightbox');
const mediaContainer = document.getElementById('lightbox-media-container');

function openLightbox(element, type) {
    mediaContainer.innerHTML = '';
    if (type === 'image') {
        const imgSource = element.querySelector('img').src;
        const newImg = document.createElement('img');
        newImg.src = imgSource;
        newImg.className = 'lightbox-content';
        mediaContainer.appendChild(newImg);
    }
    else if (type === 'video') {
        const videoSource = element.querySelector('source').src;
        const newVideo = document.createElement('video');
        newVideo.src = videoSource;
        newVideo.className = 'lightbox-content';
        newVideo.controls = true;
        newVideo.autoplay = true;
        mediaContainer.appendChild(newVideo);
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event.target === lightbox || event.target.className === 'close-btn') {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        mediaContainer.innerHTML = '';
    }
}

const lazyVideos = document.querySelectorAll('.lazy-video');
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => e);
            } else {
                entry.target.pause();
            }
        });
    });
    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });
} else {
    lazyVideos.forEach(video => video.setAttribute('autoplay', ''));
}

const translations = {
    "cs": {
        "nav-uvod": "Úvod",
        "nav-omne": "O mně",
        "nav-3d": "3D Modely",
        "nav-plakaty": "Plakáty",
        "nav-mockupy": "Mockupy",
        "nav-fotografie": "Fotografie",
        "nav-obaly": "Obaly",
        "nav-ilustrace": "Ilustrace",
        "nav-ui": "UI/UX",
        "nav-kontakt": "Kontakt",
        "omne-nadpis": "O mně",
        "omne-p1": "Jsem tvůrce s okem pro detail a neústupnou touhou po dokonalosti. Ve své práci se snažím propojovat moderní technologie s čistou estetikou, ať už se jedná o tvorbu 3D modelů, uživatelských rozhraní nebo klasický grafický design.",
        "omne-p2": "Věřím, že každý projekt vyžaduje individuální přístup a precizní provedení, od prvotního konceptu až po finální tah. Mé portfolio je odrazem této filozofie – sbírkou děl, kterým jsem věnoval svou plnou pozornost a nasazení.",
        "nadpis-3d": "3D Modely",
        "nadpis-plakaty": "Plakáty",
        "nadpis-mockupy": "Mockupy",
        "nadpis-fotografie": "Fotografie",
        "nadpis-obaly": "Obaly hudebních alb",
        "nadpis-ilustrace": "Ilustrace & Magazín",
        "nadpis-ui": "Ukázka UI/UX",
        "nadpis-manual": "Logomanuál",
        "manual-p": "Kliknutím na náhled níže otevřete kompletní specifikaci vizuální identity v PDF formátu.",
        "manual-btn": "Otevřít PDF",
        "nadpis-kontakt": "Kontakt",
        "form-jmeno": "Vaše jméno",
        "form-email": "Váš email",
        "form-zprava": "Vaše zpráva",
        "form-btn": "Odeslat zprávu",
        "form-uspech": "Děkuji vám. Vaše zpráva byla úspěšně odeslána. Brzy se vám ozvu.",
        "footer-text": "© 2026 Jáchym Vondráček. Všechna práva vyhrazena."
    },
    "en": {
        "nav-uvod": "Home",
        "nav-omne": "About",
        "nav-3d": "3D Models",
        "nav-plakaty": "Posters",
        "nav-mockupy": "Mockups",
        "nav-fotografie": "Photography",
        "nav-obaly": "Album Covers",
        "nav-ilustrace": "Illustration & Magazine",
        "nav-ui": "UI/UX",
        "nav-kontakt": "Contact",
        "omne-nadpis": "About Me",
        "omne-p1": "I am a creator with an eye for detail and an unrelenting desire for perfection. In my work, I strive to connect modern technologies with clean aesthetics, whether it's 3D modeling, user interfaces, or classic graphic design.",
        "omne-p2": "I believe that every project requires an individual approach and precise execution, from the initial concept to the final stroke. My portfolio is a reflection of this philosophy – a collection of works to which I have devoted my full attention and dedication.",
        "nadpis-3d": "3D Models",
        "nadpis-plakaty": "Posters",
        "nadpis-mockupy": "Mockups",
        "nadpis-fotografie": "Photography",
        "nadpis-obaly": "Album Covers",
        "nadpis-ilustrace": "Illustration & Magazine",
        "nadpis-ui": "UI/UX Showcase",
        "nadpis-manual": "Brand Manual",
        "manual-p": "Click the preview below to open the complete visual identity specification in PDF format.",
        "manual-btn": "Open PDF",
        "nadpis-kontakt": "Contact",
        "form-jmeno": "Your Name",
        "form-email": "Your Email",
        "form-zprava": "Your Message",
        "form-btn": "Send Message",
        "form-uspech": "Thank you. Your message has been successfully sent. I will get back to you soon.",
        "footer-text": "© 2026 Jáchym Vondráček. All rights reserved."
    }
};

let currentLang = localStorage.getItem("preferredLanguage");

if (!currentLang) {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.toLowerCase().startsWith("cs") || userLang.toLowerCase().startsWith("sk")) {
        currentLang = "cs";
    } else {
        currentLang = "en";
    }
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    const toggleBtn = document.getElementById("language-toggle");
    if(toggleBtn) {
        toggleBtn.textContent = lang === "cs" ? "EN" : "CS";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);

    const toggleBtn = document.getElementById("language-toggle");
    if(toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            currentLang = currentLang === "cs" ? "en" : "cs";
            localStorage.setItem("preferredLanguage", currentLang);
            applyLanguage(currentLang);
            
            if(navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});