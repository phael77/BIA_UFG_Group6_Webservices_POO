function togglePaymentFields() {
    // Hide all payment form sections first
    document.getElementById('credit-card-form').style.display = 'none';
    document.getElementById('pix-form').style.display = 'none';
    document.getElementById('boleto-form').style.display = 'none';
    document.getElementById('pix-section').style.display = 'none';
    document.getElementById('boleto-section').style.display = 'none';
    
    // Show relevant payment form based on selection
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (selectedPaymentMethod === 'pix') {
        document.getElementById('pix-form').style.display = 'block';
        document.getElementById('pix-section').style.display = 'block';
    } else if (selectedPaymentMethod === 'boleto') {
        document.getElementById('boleto-form').style.display = 'block';
        document.getElementById('boleto-section').style.display = 'block';
    } else {
        document.getElementById('credit-card-form').style.display = 'block';
    }
}

// Initialize the payment form based on the default selected payment method
document.addEventListener("DOMContentLoaded", function() {
    togglePaymentFields();
});