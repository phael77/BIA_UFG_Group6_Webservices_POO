// Função para exibir o popup de login
function showLoginPopup() {
    // Altera o estilo do popup para exibi-lo (muda o display para 'block')
    document.getElementById('login-popup').style.display = 'block';
}

// Função para fechar o popup de login
function closePopup() {
    // Altera o estilo do popup para escondê-lo (muda o display para 'none')
    document.getElementById('login-popup').style.display = 'none';
}

// Evento que fecha o popup se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    // Obtém o elemento do popup de login
    var modal = document.getElementById('login-popup');
    // Verifica se o clique foi na área externa do popup
    if (event.target == modal) {
        // Se o clique for na área externa, o popup é fechado
        modal.style.display = 'none';
    }
}
