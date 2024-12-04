// Função assíncrona para carregar os usuários a partir do backend (via API, retornando um JSON)
async function loadUsers() {
  try {
    // Faz a requisição para o backend para obter os usuários
    const response = await fetch('/api/users');
    
    // Verifica se a resposta foi bem-sucedida (status HTTP 200)
    if (!response.ok) {
      throw new Error('Erro ao carregar os usuários');
    }
    
    // Converte a resposta em JSON
    const users = await response.json();
    return users; // Retorna a lista de usuários
  } catch (error) {
    // Em caso de erro, exibe uma mensagem no console e retorna uma lista vazia
    console.error('Erro ao carregar os usuários:', error);
    return [];
  }
}

// Lógica de login (ao enviar o formulário)
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();  // Previne o envio tradicional do formulário

  // Captura os valores de usuário e senha digitados
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Carrega os usuários do backend
  const users = await loadUsers(); 

  // Verifica se existe um usuário com o nome de usuário e senha informados
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Se o login for bem-sucedido, oculta a mensagem de erro e exibe um alerta de sucesso
    document.getElementById('errorMessage').style.display = 'none';
    alert('Login bem-sucedido!');

    // Armazena os dados do usuário no localStorage (para persistência da sessão)
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Redireciona o usuário dependendo do seu perfil (admin ou usuário comum)
    if (user.profile === 2) {
      window.location.href = '/admin'; // Página de administração para administradores
    } else {
      window.location.href = '/user'; // Página do usuário comum
    }
  } else {
    // Se as credenciais não corresponderem, exibe a mensagem de erro
    document.getElementById('errorMessage').style.display = 'block';
  }
});

// Exibir o formulário de registro ao clicar no botão
document.getElementById('showRegisterForm').addEventListener('click', function(event) {
  event.preventDefault();  // Previne o comportamento padrão do link
  window.location.href = '/register'; // Redireciona para a página de registro
});

// Lógica de registro (ao enviar o formulário de registro)
document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();  // Previne o envio tradicional do formulário

  // Captura os valores de nome de usuário, senha e confirmação de senha
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Carrega os usuários do backend
  const users = await loadUsers();

  // Verifica se o nome de usuário já existe
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    alert("Nome de usuário já existe. Por favor, escolha outro.");
    return;
  }

  // Verifica se as senhas coincidem
  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  // Cria um novo objeto de usuário com as informações fornecidas
  const newUser = { username, password, profile: 1 };  // Por padrão, o perfil é 'user'

  // Tenta enviar o novo usuário para o backend (API)
  try {
    const response = await fetch('/api/users', {
      method: 'POST',  // Método de envio POST
      headers: {
        'Content-Type': 'application/json',  // Indica que o corpo da requisição é JSON
      },
      body: JSON.stringify(newUser),  // Envia o novo usuário como JSON
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const error = await response.json(); // Em caso de erro, obtém a mensagem de erro do backend
      alert(error.error); // Exibe o erro se o nome de usuário já existir
      return;
    }

    alert("Conta criada com sucesso!");
    window.location.href = '/login'; // Redireciona para a página de login após sucesso no registro
  } catch (error) {
    // Em caso de erro na requisição, exibe uma mensagem de erro
    console.error('Erro ao registrar o usuário:', error);
    alert('Erro ao criar a conta.');
  }
});

// Função para verificar se um usuário está logado (presente no localStorage)
function isUserLoggedIn() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  return loggedInUser !== null;  // Retorna true se houver um usuário logado, caso contrário, false
}

// Exemplo de como desabilitar ou habilitar o botão "Adicionar ao Carrinho" com base no status de login
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButton = document.querySelector('.add-to-cart-button');
  
  if (addToCartButton) {
    if (isUserLoggedIn()) {
      addToCartButton.disabled = false;  // Habilita o botão se o usuário estiver logado
    } else {
      addToCartButton.disabled = true;   // Desabilita o botão se não houver usuário logado
    }
  }
});
