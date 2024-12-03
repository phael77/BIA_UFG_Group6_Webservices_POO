// Show the login popup
function showLoginPopup() {
    document.getElementById('login-popup').style.display = 'block';
}

// Close the login popup
function closePopup() {
    document.getElementById('login-popup').style.display = 'none';
}

// Close the popup if the user clicks outside the modal content
window.onclick = function(event) {
    var modal = document.getElementById('login-popup');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
