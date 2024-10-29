// document.addEventListener("DOMContentLoaded", function () {
//     const loginLink = document.getElementById('login-link');
//     const logoutLink = document.getElementById('logout-link');
//     const loginModal = document.getElementById('loginModal');
//     const loginForm = document.getElementById('loginForm');
//     const closeModalBtn = document.querySelector('.close');
//
//     function toggleAuthLinks() {
//         const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//         loginLink.style.display = isLoggedIn ? 'none' : 'inline';
//         logoutLink.style.display = isLoggedIn ? 'inline' : 'none';
//     }
//
//     loginLink.addEventListener('click', () => {
//         loginModal.style.display = 'block';
//     });
//
//     closeModalBtn.addEventListener('click', () => {
//         loginModal.style.display = 'none';
//     });
//
//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//
//         if (username && password) {
//             localStorage.setItem('isLoggedIn', 'true');
//             loginModal.style.display = 'none';
//             toggleAuthLinks();
//         } else {
//             alert('Please enter a valid username and password.');
//         }
//     });
//
//     logoutLink.addEventListener('click', () => {
//         localStorage.setItem('isLoggedIn', 'false');
//         toggleAuthLinks();
//     });
//
//     window.addEventListener('load', toggleAuthLinks);
//
//     window.onclick = (event) => {
//         if (event.target === loginModal) {
//             loginModal.style.display = 'none';
//         }
//     };
// });


const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeLoginModal = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', true);
        showLoginStatus();
        loginModal.style.display = 'none';
    } else {
        alert("Please enter a valid username and password.");
    }
});

function showLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        document.getElementById('booking-form').addEventListener('submit', saveBookingInfo);
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        document.getElementById('booking-form').removeEventListener('submit', saveBookingInfo);
    }
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('bookingInfo');
    showLoginStatus();
});

function saveBookingInfo(e) {
    e.preventDefault();

    const bookingInfo = {
        fullName: document.querySelector('input[name="fullName"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        checkin: document.querySelector('input[name="checkin"]').value,
        checkout: document.querySelector('input[name="checkout"]').value,
        roomType: document.querySelector('select[name="roomType"]').value,
        requests: document.querySelector('textarea[name="requests"]').value,
    };

    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
    alert("Booking saved successfully!");
}

document.addEventListener('DOMContentLoaded', showLoginStatus);

function saveUser(username, email, phone, bookingInfo) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Create a new user object
    const newUser = {
        username: username,
        email: email,
        phone: phone,
        bookingInfo: bookingInfo,
        timestamp: new Date().toISOString()
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
}

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userDisplay = document.getElementById('user-display');
    userDisplay.innerHTML = '';

    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `User ${index + 1}: ${user.username}, Email: ${user.email}, Phone: ${user.phone}, Booking Info: ${JSON.stringify(user.bookingInfo)}`;
        userDisplay.appendChild(li);
    });
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const bookingInfo = {
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        roomType: document.getElementById('roomType').value,
        requests: document.getElementById('requests').value
    };

    saveUser(username, email, phone, bookingInfo);

    document.getElementById('booking-form').reset();

    displayUsers();
});

displayUsers();

