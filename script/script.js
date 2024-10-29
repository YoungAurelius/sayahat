document.addEventListener("DOMContentLoaded", function () {
    // Modal functionality for the footer
    const modal = document.getElementById("subscribeModal");
    const btn = document.getElementById("subscribeBtn");
    const span = document.querySelector(".modal .close");

    if (btn && modal && span) {
        btn.onclick = () => modal.style.display = "block";
        span.onclick = () => modal.style.display = "none";

        window.onclick = event => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    document.getElementById('menu-btn').addEventListener('click', function() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');
    });

    const menuButton = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    menuButton.addEventListener('click', () => {
        navbar.classList.toggle('open'); // Toggle the 'open' class on navbar
    });



    // Theme toggle functionality
    const toggleButton = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const icon = document.createElement('i');

    icon.className = savedTheme === 'dark' || (prefersDarkScheme.matches && !localStorage.getItem('theme'))
        ? 'fas fa-moon'
        : 'fas fa-sun';
    toggleButton.appendChild(icon);

    document.documentElement.setAttribute('data-theme', savedTheme);

    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });

    if (prefersDarkScheme.matches && !localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

    prefersDarkScheme.addEventListener('change', e => {
        const newPreferredTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newPreferredTheme);
        localStorage.setItem('theme', newPreferredTheme);

        icon.className = newPreferredTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    });




    // Box expand and overlay functionality
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', function () {
            const expandedBox = document.querySelector('.box.expanded');
            if (expandedBox && expandedBox !== this) {
                expandedBox.classList.remove('expanded');
            }
            this.classList.toggle('expanded');
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.classList.toggle('active', this.classList.contains('expanded'));
                document.body.classList.toggle('no-scroll', this.classList.contains('expanded'));
            }
        });
    });

    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', function () {
            const expanded = document.querySelector('.box.expanded');
            if (expanded) {
                expanded.classList.remove('expanded');
                this.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    document.getElementById('fullscreenBtn').addEventListener('click', function() {
        let elem = document.getElementById('galleryCarousel');
        let fullscreenIcon = this.querySelector('i');

        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenIcon.className = 'fas fa-expand'; // Change to expand icon
        } else {
            // Enter fullscreen mode
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            fullscreenIcon.className = 'fas fa-compress'; // Change to compress icon
        }
    });

// Update icon if the user exits fullscreen with the ESC key or system controls
    document.addEventListener('fullscreenchange', () => {
        const fullscreenIcon = document.getElementById('fullscreenBtn').querySelector('i');
        if (!document.fullscreenElement) {
            fullscreenIcon.className = 'fas fa-expand'; // Change to expand icon when exiting fullscreen
        }
    });



    document.getElementById('menu-btn').addEventListener('click', function() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');
    });

    //Filtering


    // Booking form pricing display

    document.addEventListener("DOMContentLoaded", function () {
        const roomType = document.querySelector("select[name='roomType']");
        const priceDisplay = document.getElementById("price-display");

        const roomPrices = {
            single: 10000,
            double: 15000,
            suite: 25000,
        };

        roomType.addEventListener("change", function () {
            const selectedRoom = roomType.value;
            if (roomPrices[selectedRoom]) {
                priceDisplay.innerText = `Құны: ${roomPrices[selectedRoom]} KZT`;
            } else {
                priceDisplay.innerText = "Құны: -";
            }
        });
    });


    // Extra info toggle within boxes
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', () => {
            const extraInfo = box.querySelector('.extra-info');
            if (extraInfo) {
                extraInfo.style.display = (extraInfo.style.display === 'block') ? 'none' : 'block';
            }
        });
    });

    // Video control button
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.onclick = () => {
            const src = btn.getAttribute('data-src');
            const video = document.querySelector('.video-container .video');
            if (video) video.src = src;
        };
    });

    // Play click sound on box click only
    function playClickSound() {
        const clickSound = document.getElementById('click-sound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }

    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', playClickSound);
    });



});
