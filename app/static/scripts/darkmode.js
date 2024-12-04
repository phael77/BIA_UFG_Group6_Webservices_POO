// Evento que aguarda o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o corpo da página e o botão de alternância para o modo escuro
    const body = document.querySelector('body');
    const toggleButton = document.querySelector('.toggle-darkmode');
  
    // Verifica se o modo escuro foi ativado anteriormente e, em caso afirmativo, aplica a classe 'dark-mode' ao corpo
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
  
    // Evento de clique no botão de alternância para mudar entre o modo escuro e o modo claro
    toggleButton.addEventListener('click', () => {
        // Alterna a classe 'dark-mode' no corpo da página
        body.classList.toggle('dark-mode');
      
        // Salva o estado do modo escuro no localStorage
        if (body.classList.contains('dark-mode')) {
            // Se o modo escuro foi ativado, armazena 'enabled' no localStorage
            localStorage.setItem('darkMode', 'enabled');
        } else {
            // Se o modo escuro foi desativado, remove a entrada do localStorage
            localStorage.removeItem('darkMode');
        }
      
        // Exibe o estado atual do modo escuro no console
        if (body.classList.contains('dark-mode')) {
            console.log('Modo escuro ativado.');
        } else {
            console.log('Modo escuro desativado.');
        }
    });
});
