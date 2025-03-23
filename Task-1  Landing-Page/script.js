     
        const mobileNavButton = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        mobileNavButton.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }

            
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    