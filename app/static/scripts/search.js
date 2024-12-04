// Obtém os elementos do DOM para a barra de pesquisa e o dropdown de sugestões
const searchInput = document.getElementById('searchInput');  // Referência ao campo de entrada da pesquisa
const searchDropdown = document.querySelector('.search-bar-suggestions');  // Referência ao dropdown de sugestões

// Evento disparado quando o campo de pesquisa recebe o foco (é clicado ou selecionado)
searchInput.addEventListener('focus', function() {
  searchDropdown.style.display = 'block';  // Exibe o dropdown de sugestões
});

// Evento disparado sempre que o usuário digita no campo de pesquisa
searchInput.addEventListener('input', function() {
  if (searchInput.value) {
    // Se há texto digitado no campo de pesquisa, o dropdown será exibido
    searchDropdown.style.display = 'block';
  } else {
    // Caso contrário, o dropdown será escondido
    searchDropdown.style.display = 'none';
  }
});

// Evento para fechar o dropdown se o usuário clicar fora da barra de pesquisa ou do dropdown
document.addEventListener('click', function(event) {
  if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
    // Se o clique não foi no campo de pesquisa nem no dropdown, o dropdown será ocultado
    searchDropdown.style.display = 'none';
  }
});

// Previne o fechamento do dropdown ao clicar dentro do próprio dropdown de sugestões
searchDropdown.addEventListener('click', function(event) {
  event.stopPropagation();  // Impede a propagação do clique para o documento, evitando que o dropdown seja fechado
});
