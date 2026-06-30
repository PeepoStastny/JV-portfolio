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
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('aktivni');
                        }
                    });
                }
            });
        }, observerOptions);
        sections.forEach(sec => observer.observe(sec));

        // Asynchronní odesílání formuláře
        const kontaktForm = document.getElementById('kontakt-formular');
        const zpravaUspech = document.getElementById('zprava-uspech');

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
            }).catch(error => console.error('Došlo k chybě při odesílání:', error));
        });

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
                        entry.target.play().catch(e => console.warn('Přehrávání bylo blokováno prohlížečem.', e));
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