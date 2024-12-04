    // Function to toggle between the different payment methods' forms
    function togglePaymentFields() {
        // Get all payment form sections
        var creditCardForm = document.getElementById('credit-card-form');
        var pixForm = document.getElementById('pix-form');
        var boletoForm = document.getElementById('boleto-form');
        
        // Get the selected payment method
        var paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // Hide all forms initially
        creditCardForm.style.display = 'none';
        pixForm.style.display = 'none';
        boletoForm.style.display = 'none';
        
        // Show the corresponding form based on the selected payment method
        if (paymentMethod === 'credit-card') {
            creditCardForm.style.display = 'block';
        } else if (paymentMethod === 'pix') {
            pixForm.style.display = 'block';
        } else if (paymentMethod === 'boleto') {
            boletoForm.style.display = 'block';
        }
    }

    // Call the function on page load to show the correct form based on the default selection
    window.onload = function() {
        togglePaymentFields();
    }