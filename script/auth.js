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
// Modals and buttons
const loginModal = document.getElementById('loginModal'); // Make sure this targets the correct element
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeLoginModal = document.querySelector('.close');
const closeSignupModal = document.querySelector('.close2');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('errorMessage'); // Element to display error messages
const signupBtn = document.getElementById('signupBtn');

// Booking form elements
const bookBtn = document.getElementById('bookBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const roomTypeInput = document.getElementById('roomType');
const requestsInput = document.getElementById('requests');
const userDisplay = document.getElementById('user-display');

function showLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'block';

        const currentUser = localStorage.getItem('currentUser');
        document.getElementById('userStatus').textContent = `Welcome, ${currentUser}!`; // Display logged-in user's name
    } else {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        document.getElementById('userStatus').textContent = ''; // Clear user status if logged out
    }
}

// Handle login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('currentUser', username);
        showLoginStatus();
        loginModal.style.display = 'none'; // Close the modal
    } else {
        errorMessage.textContent = 'Incorrect username or password';
    }
});

// Handle sign up
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        errorMessage.textContent = 'Username already exists';
    } else {
        const newUser = { username, password, bookings: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('currentUser', username);
        showLoginStatus();
        signupModal.style.display = 'none'; // Close the modal
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    showLoginStatus();
});

// On page load, check login status
document.addEventListener('DOMContentLoaded', showLoginStatus);

// Open modals when the user clicks login or signup buttons
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
});

// Close modals when the user clicks the close button
closeLoginModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeSignupModal.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

// Close modals when clicking outside the modal (for better UX)
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
});


// Handling booking after login
function handleBooking() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        const currentUser = localStorage.getItem('currentUser');

        // Get the form input values
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const roomType = roomTypeInput.value;
        const requests = requestsInput.value;

        // Validate form data
        if (!name || !email || !phone || !checkin || !checkout || !roomType) {
            alert('Please fill in all required fields!');
            return;
        }

        // Retrieve users data from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === currentUser);

        if (user) {
            // Booking details
            const bookingDetails = {
                name,
                email,
                phone,
                checkin,
                checkout,
                roomType,
                requests,
                date: new Date().toLocaleDateString()
            };

            // Add the booking to the user's bookings array
            user.bookings.push(bookingDetails);

            // Update the user data in localStorage with the new booking information
            const updatedUsers = users.map(u => u.username === currentUser ? user : u);
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            alert('Booking successful!');
            displayBookings(); // Optionally, update booking display
        }
    } else {
        alert('You must log in to make a booking!');
    }
}

// Display bookings of the logged-in user
function displayBookings() {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === currentUser);

    if (user) {
        userDisplay.innerHTML = ''; // Clear previous bookings
        user.bookings.forEach((booking, index) => {
            const li = document.createElement('li');
            li.textContent = `Booking ${index + 1}: ${booking.roomType} from ${booking.checkin} to ${booking.checkout}, Additional Requests: ${booking.requests}`;
            userDisplay.appendChild(li);
        });
    }
}

// Attach the handleBooking function to the booking button
bookBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    handleBooking();
});
