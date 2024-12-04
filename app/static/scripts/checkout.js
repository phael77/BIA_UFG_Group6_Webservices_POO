// Função que alterna os campos do formulário de pagamento com base na opção selecionada
function togglePaymentFields() {
    // Primeiro, esconde todas as seções do formulário de pagamento
    document.getElementById('credit-card-form').style.display = 'none'; // Esconde o formulário de cartão de crédito
    document.getElementById('pix-form').style.display = 'none'; // Esconde o formulário de PIX
    document.getElementById('boleto-form').style.display = 'none'; // Esconde o formulário de boleto
    document.getElementById('pix-section').style.display = 'none'; // Esconde a seção de PIX
    document.getElementById('boleto-section').style.display = 'none'; // Esconde a seção de boleto
    
    // Obtém o valor da opção de pagamento selecionada (pix, boleto ou cartão de crédito)
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Verifica qual método de pagamento foi selecionado e exibe o formulário correspondente
    if (selectedPaymentMethod === 'pix') {
        document.getElementById('pix-form').style.display = 'block'; // Exibe o formulário de PIX
        document.getElementById('pix-section').style.display = 'block'; // Exibe a seção de PIX
    } else if (selectedPaymentMethod === 'boleto') {
        document.getElementById('boleto-form').style.display = 'block'; // Exibe o formulário de boleto
        document.getElementById('boleto-section').style.display = 'block'; // Exibe a seção de boleto
    } else {
        document.getElementById('credit-card-form').style.display = 'block'; // Exibe o formulário de cartão de crédito
    }
}

// Inicializa o formulário de pagamento com base no método de pagamento selecionado por padrão
document.addEventListener("DOMContentLoaded", function() {
    togglePaymentFields(); // Chama a função para ajustar a visibilidade dos campos de pagamento ao carregar a página
});
