// Variáveis globais
const cartPage = document.getElementById("cart-page");
const checkoutPage = document.getElementById("checkout-page");
const cartItemsContainer = document.getElementById("cart-items");
const orderSummary = document.getElementById("order-summary");
const goToCheckoutButton = document.getElementById("go-to-checkout");
const cartTotalElement = document.getElementById("cart-total");

// Carrinho de compras (inicia vazio)
let cart = [];

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
    // Verifica se o item já está no carrinho
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    renderCartItems();
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
    cartItemsContainer.innerHTML = ""; // Limpa os itens existentes
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Preço: R$ ${item.price.toFixed(2)}</p>
            <div class="quantity">
                <button class="decrease" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalElement.textContent = total.toFixed(2);
    attachCartEvents();
}

// Função para adicionar eventos aos botões de quantidade no carrinho
function attachCartEvents() {
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            cart[index].quantity++;
            renderCartItems();
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Remove o item se a quantidade for 0
            }
            renderCartItems();
        });
    });
}

// Evento: Ir para o Checkout
goToCheckoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    // Transfere os itens para o resumo do pedido no Checkout
    orderSummary.innerHTML = "<h2>Resumo do Pedido</h2>";
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("order-item");
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Quantidade: ${item.quantity}</p>
            <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
        `;
        orderSummary.appendChild(itemDiv);
    });

    // Muda para a página de checkout
    cartPage.classList.add("hidden");
    checkoutPage.classList.remove("hidden");
});

