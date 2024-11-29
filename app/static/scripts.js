// Get references to the sidebar and toggle button
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.toggle-sidebar');

// Add event listener to the toggle button
toggleButton.addEventListener('click', () => {
  // Toggle the 'hidden' class to show/hide the sidebar
  sidebar.classList.toggle('hidden');
  
  // Toggle the button's movement class
  toggleButton.classList.toggle('move');
});
