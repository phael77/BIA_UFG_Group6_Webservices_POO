document.addEventListener('DOMContentLoaded', function () {
    // Função que atualiza o preço total do carrinho quando as quantidades são alteradas.
    function updateTotalPrice() {
        let totalPrice = 0;
        const itemTotals = document.querySelectorAll('.cart-page-item');
        itemTotals.forEach(function (item) {
            const price = parseFloat(item.getAttribute('data-item-price'));
            const quantity = parseInt(item.querySelector('.quantity-value').innerText, 10);
            const itemTotal = price * quantity;
            item.querySelector('.item-total').innerText = 'Total: R$ ' + itemTotal.toFixed(2);
            totalPrice += itemTotal;
        });
        document.getElementById('total-price').innerText = 'R$ ' + totalPrice.toFixed(2);
    }

    // Adiciona listeners de evento para os botões de aumento e diminuição de quantidade.
    const increaseBtns = document.querySelectorAll('.quantity-btn.increase');
    const decreaseBtns = document.querySelectorAll('.quantity-btn.decrease');

    increaseBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const quantityElement = btn.closest('.cart-page-item').querySelector('.quantity-value');
            let currentQuantity = parseInt(quantityElement.innerText, 10);
            quantityElement.innerText = currentQuantity + 1;
            updateTotalPrice();
        });
    });

    decreaseBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const quantityElement = btn.closest('.cart-page-item').querySelector('.quantity-value');
            let currentQuantity = parseInt(quantityElement.innerText, 10);
            if (currentQuantity > 1) {
                quantityElement.innerText = currentQuantity - 1;
                updateTotalPrice();
            }
        });
    });

    // Atualiza o preço total inicialmente ao carregar a página.
    updateTotalPrice();
});