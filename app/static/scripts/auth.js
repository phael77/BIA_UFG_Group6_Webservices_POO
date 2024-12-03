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

      // Armazenar os dados do usuário logado no localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Redirecionar para a página inicial ou página específica dependendo do perfil
      window.location.href = '/'; // Redirecionar para a página inicial
      
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

document.addEventListener('DOMContentLoaded', function() {
  // Check if a user is logged in by checking localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (loggedInUser) {
    // Show logged-in user profile and logout button
    const profileButton = document.querySelector('.profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileDropdownUnlogged = document.querySelector('.profile-dropdown-unlogged');

    // Show the profile dropdown for logged-in users
    profileButton.style.display = 'block';
    profileDropdown.style.display = 'block';
    profileDropdownUnlogged.style.display = 'none';

    // Show welcome message and logout button
    const welcomeMessage = profileDropdown.querySelector('p');
    welcomeMessage.textContent = `Welcome, ${loggedInUser.username}`;
    
    // Add logout functionality
    const logoutButton = profileDropdown.querySelector('.logout-button');
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('loggedInUser'); // Remove user from localStorage
      window.location.href = '/'; // Redirect to home page
    });

    // Admin users (profile === 'admin')
    if (loggedInUser.profile === 'admin') {
      const adminButton = document.createElement('a');
      adminButton.href = '/admin';
      adminButton.innerHTML = '<button class="admin-button">Admin Dashboard</button>';
      profileDropdown.appendChild(adminButton);
    }

  } else {
    // Show login and register buttons for guests
    const profileButton = document.querySelector('.profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileDropdownUnlogged = document.querySelector('.profile-dropdown-unlogged');

    // Hide logged-in profile options
    profileButton.style.display = 'none';
    profileDropdown.style.display = 'none';
    profileDropdownUnlogged.style.display = 'block';
  }
});
