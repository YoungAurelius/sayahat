

//footer
let modal = document.getElementById("subscribeModal");
let btn = document.getElementById("subscribeBtn");
let span = document.querySelector(".modal .close");
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

toggleButton.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    theme = (theme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', function () {
        const expanded = document.querySelector('.box.expanded');
        if (expanded) {
            expanded.classList.remove('expanded');
            document.querySelector('.overlay').classList.remove('active');
            document.body.classList.remove('no-scroll');
        } else {
            this.classList.add('expanded');
            document.querySelector('.overlay').classList.add('active');
            document.body.classList.add('no-scroll');
        }
    });
});

document.querySelector('.overlay').addEventListener('click', function () {
    const expanded = document.querySelector('.box.expanded');
    if (expanded) {
        expanded.classList.remove('expanded');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});


//
// //for the blog page
// document.querySelectorAll('.box').forEach(box => {
//     box.addEventListener('click', () => {
//         document.querySelectorAll('.box').forEach(b => b.classList.remove('expanded'));
//         document.querySelector('.overlay').classList.add('active');
//         box.classList.add('expanded');
//         document.body.classList.add('no-scroll'); // Disable scroll when expanded
//     });
// });
//
// document.querySelector('.overlay').addEventListener('click', () => {
//     document.querySelector('.overlay').classList.remove('active');
//     document.querySelectorAll('.box').forEach(b => b.classList.remove('expanded'));
//     document.body.classList.remove('no-scroll'); // Enable scroll
// });
//
//


//for booking

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


//for destinations

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
        const extraInfo = box.querySelector('.extra-info');
        if (extraInfo.style.display === 'block') {
            extraInfo.style.display = 'none';
        } else {
            extraInfo.style.display = 'block';
        }
    });
});

