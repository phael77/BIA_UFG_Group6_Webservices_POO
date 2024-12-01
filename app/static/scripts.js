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
