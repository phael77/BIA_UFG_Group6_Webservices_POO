// sidebar.js

// Obtém referências para a barra lateral (sidebar), o botão de alternância (toggle) e o título do site
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.toggle-sidebar');
const siteTitle = document.querySelector('.site-title');

// Adiciona um ouvinte de evento no botão de alternância
toggleButton.addEventListener('click', () => {
  // Alterna a classe 'visible' para mostrar/ocultar a barra lateral
  sidebar.classList.toggle('visible');
  
  // Alterna a classe de movimento do botão, fazendo-o se deslocar para a direita quando o menu estiver visível
  toggleButton.classList.toggle('shift-right-when-menu-visible');

  // Alterna a classe de movimento do título do site, fazendo-o se deslocar para a direita quando o menu estiver visível
  siteTitle.classList.toggle('shift-right-when-menu-visible');
});
