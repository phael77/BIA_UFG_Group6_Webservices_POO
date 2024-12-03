// Função para carregar os usuários a partir do backend
async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Erro ao carregar os usuários.');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Erro ao carregar os usuários:', error);
    return [];
  }
}

// Função para salvar os usuários no backend
async function saveUsers(users) {
  try {
    const response = await fetch('/api/users', {
      method: 'PUT',  // Usando PUT para atualizar o arquivo JSON
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar os usuários.');
    }
  } catch (error) {
    console.error('Erro ao salvar os usuários:', error);
  }
}

// Lógica de login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = await loadUsers(); // Obter usuários do backend

  // Verificar se o nome de usuário e senha coincidem com algum usuário armazenado
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      document.getElementById('errorMessage').style.display = 'none';
      alert('Login bem-sucedido!');

      // Armazenar os dados do usuário logado, pode ser no sessionStorage ou localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Redirecionar para a página inicial ou página específica dependendo do perfil
      if (user.profile === 'admin') {
          window.location.href = '/admin'; // Redirecionar para a página de admin
      } else {
          window.location.href = '/'; // Redirecionar para a página inicial
      }
  } else {
      document.getElementById('errorMessage').style.display = 'block';
  }
});

// Exibir o formulário de registro
document.getElementById('showRegisterForm').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = '/register';
});

// Enviar o formulário de registro
document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const users = await loadUsers(); // Obter usuários do backend

  // Verificar se o nome de usuário já existe
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    alert("Nome de usuário já existe. Por favor, escolha outro.");
    return;
  }

  // Verificar se as senhas coincidem
  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  // Adicionar o novo usuário com um nível de perfil
  const profile = 'user'; // Por padrão, o usuário será um 'user'
  const newUser = { username, password, profile };
  users.push(newUser);

  // Salvar os usuários no backend
  await saveUsers(users);

  alert("Conta criada com sucesso!");
  window.location.href = '/login'; // Redirecionar para a página de login
});