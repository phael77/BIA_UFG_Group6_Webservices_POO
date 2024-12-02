// Get references to the sidebar and toggle button
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.toggle-sidebar');
const siteTitle = document.querySelector('.site-title');

// Add event listener to the toggle button
toggleButton.addEventListener('click', () => {
  // Toggle the 'visible' class to show/hide the sidebar
  sidebar.classList.toggle('visible');
  
  // Toggle the button's movement class
  toggleButton.classList.toggle('shift-right-when-menu-visible');

  siteTitle.classList.toggle('shift-right-when-menu-visible');
});

const searchInput = document.getElementById('searchInput');
const searchDropdown = document.querySelector('.search-bar-suggestions');

// Search bar focus event
searchInput.addEventListener('focus', function() {
  searchDropdown.style.display = 'block';
});

// Search bar input event
searchInput.addEventListener('input', function() {
  if (searchInput.value) {
    searchDropdown.style.display = 'block';
  } else {
    searchDropdown.style.display = 'none';
  }
});

// Close search dropdown if clicking outside
document.addEventListener('click', function(event) {
  if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
    searchDropdown.style.display = 'none';
  }
});

// Prevent dropdown closing when clicking inside the dropdown
searchDropdown.addEventListener('click', function(event) {
  event.stopPropagation();
});


// Check if there are any users stored in localStorage
function loadUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users;
}

// Save the list of users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Handle the login logic
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = loadUsers(); // Get users from localStorage

  // Check if the username and password match any stored users
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      // Login successful, hide the error message
      document.getElementById('errorMessage').style.display = 'none';
      alert('Login successful!'); // Redirect or show success message
      // Redirect to another page (e.g., dashboard)
      // window.location.href = "/dashboard";  // Uncomment if needed
  } else {
      // If no match, show the error message
      document.getElementById('errorMessage').style.display = 'block';
  }
});

// Handle showing the register form (you can add a register form similarly)
document.getElementById('showRegisterForm').addEventListener('click', function(event) {
  event.preventDefault();
  // Show the registration form here (implement as needed)
  // For now, let's assume you want to log the user in or use the same page for registration
  alert("You can implement registration here!");
});

// (Optional) Add some initial users for testing purposes, you can remove or modify this in the real app.
function initUsers() {
  const users = loadUsers();

  // Add default users if there are no users in localStorage
  if (users.length === 0) {
      users.push({ username: 'user1', password: 'password123' });
      users.push({ username: 'user2', password: 'password456' });
      users.push({ username: 'user3', password: 'password789' });
      saveUsers(users);
  }
}

// Initialize default users (run only once or whenever needed)
initUsers();
