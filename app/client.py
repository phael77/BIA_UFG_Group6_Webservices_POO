# Importando os módulos necessários do Flask
from flask import render_template, request, redirect, url_for, jsonify, session
import json
import os
from app import app

# Definindo a chave secreta para o gerenciamento da sessão
# A chave secreta é necessária para garantir que os dados da sessão sejam criptografados
app.secret_key = '1234567890'  # Certifique-se de definir uma chave secreta segura em produção

def save_products(products):
    """
    Função para salvar a lista de produtos em um arquivo JSON.
    
    Args:
        products (list): Lista de produtos a ser salva.
    """
    # Abre o arquivo 'products.json' para escrita e salva os dados no formato JSON
    with open('app/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=4)

def load_products():
    """
    Função para carregar a lista de produtos de um arquivo JSON.
    
    Retorna:
        list: A lista de produtos ou uma lista vazia caso o arquivo não exista.
    """
    # Verifica se o arquivo 'products.json' existe
    if os.path.exists('app/products.json'):
        with open('app/products.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    return []  # Retorna uma lista vazia caso o arquivo não exista

# Dados de produtos para demonstração (dados estáticos)
PRODUCTS = load_products()  # Carrega os produtos armazenados no arquivo

# Caminho para o arquivo de dados dos usuários
USERS_FILE = 'app/users.json'

def load_users():
    """
    Função para carregar os usuários de um arquivo JSON.
    
    Retorna:
        list: A lista de usuários ou uma lista vazia caso o arquivo não exista.
    """
    # Verifica se o arquivo de usuários existe
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r', encoding='utf-8') as file:
            return json.load(file)
    return []  # Retorna uma lista vazia caso o arquivo não exista

def save_users(users):
    """
    Função para salvar a lista de usuários em um arquivo JSON.
    
    Args:
        users (list): Lista de usuários a ser salva.
    """
    # Abre o arquivo 'users.json' para escrita e salva os dados no formato JSON
    with open(USERS_FILE, 'w', encoding='utf-8') as file:
        json.dump(users, file, ensure_ascii=False, indent=4)
# Endpoint da API para obter todos os usuários
@app.route("/api/users", methods=["GET"])
def get_users():
    """
    Endpoint que retorna a lista de todos os usuários em formato JSON.
    
    Retorna:
        Response: A lista de usuários no formato JSON.
    """
    # Carrega a lista de usuários do arquivo
    users = load_users()
    # Retorna a lista de usuários em formato JSON
    return jsonify(users)

# Endpoint da API para adicionar um novo usuário
@app.route("/api/users", methods=["POST"])
def create_user():
    """
    Endpoint que adiciona um novo usuário. Os dados do usuário são enviados em formato JSON.
    
    Retorna:
        Response: O usuário recém-criado em formato JSON ou uma mensagem de erro se o nome de usuário já existir.
    """
    # Obtém os dados do novo usuário enviados no corpo da requisição em formato JSON
    new_user = request.json
    users = load_users()  # Carrega a lista de usuários

    # Verifica se o nome de usuário já existe na lista
    if any(user['username'] == new_user['username'] for user in users):
        # Retorna um erro se o nome de usuário já estiver em uso
        return jsonify({"error": "Nome de usuário já existe"}), 400

    # Adiciona o novo usuário à lista
    users.append(new_user)
    # Salva a lista atualizada de usuários
    save_users(users)
    
    # Retorna o novo usuário criado com o status 201 (Criado)
    return jsonify(new_user), 201

# Página inicial
@app.route("/")
def home():
    """
    Função que renderiza a página inicial do site. Este é o ponto de entrada do site.
    
    Retorna:
        Response: Renderiza o template 'index.html' para exibir a página inicial.
    """
    return render_template('index.html')  # Retorna o template da página inicial

# Página do usuário logado
@app.route("/user")
def home_loggedin():
    """
    Função que renderiza a página inicial para usuários logados.
    
    Retorna:
        Response: Renderiza o template 'index-logged.html' para exibir a página do usuário logado.
    """
    return render_template('index-logged.html')  # Retorna o template para usuários logados

# Página de admin
@app.route("/admin")
def home_admin():
    """
    Função que renderiza a página inicial do administrador.
    
    Retorna:
        Response: Renderiza o template 'index-admin.html' para exibir a página do administrador.
    """
    return render_template('index-admin.html')  # Retorna o template para a página de administração


# Página de login
@app.route("/login", methods=["GET", "POST"])
def login():
    """
    Função para exibir a página de login e processar a autenticação do usuário.
    
    Se a requisição for do tipo POST, o nome de usuário e senha são verificados.
    Se a autenticação for bem-sucedida, o usuário é redirecionado para a página adequada com base no seu perfil.
    
    Retorna:
        Response: Renderiza a página de login ou redireciona o usuário para a página de perfil.
    """
    if request.method == "POST":
        username = request.form['username']  # Obtém o nome de usuário do formulário
        password = request.form['password']  # Obtém a senha do formulário
        
        users = load_users()  # Carrega a lista de usuários
        # Procura o usuário com o nome de usuário e senha fornecidos
        user = next((u for u in users if u['username'] == username and u['password'] == password), None)
        
        if user:
            # Se o usuário for encontrado, armazena as informações na sessão
            session['username'] = username
            session['profile'] = user['profile']
            
            # Redireciona o usuário para a página correspondente ao seu perfil
            if user['profile'] == 1:
                return redirect(url_for('home_loggedin'))  # Usuário comum
            elif user['profile'] == 2:
                return redirect(url_for('home_admin'))  # Administrador
        else:
            # Se o usuário não for encontrado, exibe uma mensagem de erro
            return render_template('login.html', error="Usuário ou senha inválidos.")
    
    return render_template('login.html')  # Retorna a página de login

# Página de logout
@app.route("/logout")
def logout():
    """
    Função para realizar o logout do usuário. Remove as informações da sessão e redireciona para a página inicial.
    
    Retorna:
        Response: Redireciona para a página inicial após limpar a sessão.
    """
    session.pop('username', None)  # Remove o nome de usuário da sessão
    session.pop('profile', None)  # Remove o perfil do usuário da sessão
    session.pop('cart', None)  # Limpa o carrinho de compras
    return redirect(url_for('home'))  # Redireciona para a página inicial

# Página de registro
@app.route("/register", methods=["GET", "POST"])
def register():
    """
    Função para exibir a página de registro e adicionar um novo usuário ao sistema.
    
    Se a requisição for do tipo POST, o nome de usuário e senha são validados e o novo usuário é criado se tudo estiver correto.
    
    Retorna:
        Response: Redireciona para a página de login após o registro ou exibe uma mensagem de erro se houver algum problema.
    """
    if request.method == "POST":
        username = request.form['username']  # Obtém o nome de usuário do formulário
        password = request.form['password']  # Obtém a senha do formulário
        confirmPassword = request.form['confirmPassword']  # Obtém a confirmação da senha
        
        # Verifica se as senhas coincidem
        if password != confirmPassword:
            return render_template('register.html', error="As senhas não coincidem.")
        
        users = load_users()  # Carrega a lista de usuários
        # Verifica se o nome de usuário já existe
        if any(user['username'] == username for user in users):
            return render_template('register.html', error="Nome de usuário já existe.")
        
        # Cria um novo usuário com o perfil padrão (usuário comum)
        new_user = {'username': username, 'password': password, 'profile': 1}  
        users.append(new_user)  # Adiciona o novo usuário à lista
        save_users(users)  # Salva a lista de usuários atualizada
        
        return redirect(url_for('login'))  # Redireciona para a página de login
    
    return render_template('register.html')  # Retorna o formulário de registro
# Página de produto (exemplo estático)
@app.route("/product/<int:product_id>")
def product(product_id):
    """
    Função para exibir os detalhes de um produto específico.
    
    O produto é buscado pelo ID na lista de produtos. Caso não seja encontrado, o usuário é redirecionado para a página inicial.
    
    Retorna:
        Response: Exibe a página do produto ou redireciona para a página inicial se o produto não for encontrado.
    """
    # Encontra o produto pelo ID
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return redirect(url_for('home'))  # Redireciona caso o produto não exista
    
    return render_template('product.html', product=product)  # Renderiza a página do produto

@app.route("/user/product/<int:product_id>")
def user_product(product_id):
    """
    Função para exibir os detalhes do produto para usuários logados.
    
    Similar à função acima, mas destinada a usuários logados. O comportamento é o mesmo, mas a página renderizada pode ser diferente.
    
    Retorna:
        Response: Exibe a página do produto para o usuário ou redireciona para a página inicial se o produto não for encontrado.
    """
    # Encontra o produto pelo ID
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return redirect(url_for('home'))  # Redireciona caso o produto não exista
    
    return render_template('user_product.html', product=product)  # Renderiza a página do produto para o usuário

# Página do carrinho de compras
@app.route("/cart")
def cart():
    """
    Função para exibir o carrinho de compras.
    
    Recupera os itens do carrinho da sessão e calcula o preço total.
    
    Retorna:
        Response: Renderiza a página do carrinho com os itens e o total calculado.
    """
    cart = session.get('cart', [])  # Recupera o carrinho da sessão (se existir)
    # Calcula o preço total multiplicando o preço de cada item pela sua quantidade
    total_price = sum(item['price'] * item['quantity'] for item in cart)
    return render_template('cart.html', cart=cart, total_price=total_price)

# Adicionar ao carrinho
@app.route("/add_to_cart/<int:product_id>", methods=["POST"])
def add_to_cart(product_id):
    """
    Função para adicionar um produto ao carrinho de compras.
    
    Verifica se o produto já existe no carrinho. Se existir, apenas atualiza a quantidade; caso contrário, adiciona um novo item.
    
    Retorna:
        Response: Redireciona para a página do carrinho após adicionar o produto.
    """
    # Encontra o produto na lista de produtos
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    
    if not product:
        return redirect(url_for('catalogo'))  # Redireciona para o catálogo se o produto não for encontrado

    # Obtém os dados do formulário de adição ao carrinho
    quantity = int(request.form['quantity'])  # Quantidade do produto
    size = request.form['size']  # Tamanho do produto
    name = request.form['name']  # Nome do produto
    price = float(request.form['price'])  # Preço do produto
    image = request.form['image']  # Imagem do produto
    
    # Recupera o carrinho atual da sessão
    cart = session.get('cart', [])
    
    # Verifica se o produto já existe no carrinho
    existing_item = next((item for item in cart if item['id'] == product_id and item['size'] == size), None)
    
    if existing_item:
        # Se o produto já existir, atualiza a quantidade
        existing_item['quantity'] += quantity
    else:
        # Se o produto não existir no carrinho, adiciona um novo item
        cart.append({
            'id': product_id,
            'name': name,
            'price': price,
            'size': size,
            'quantity': quantity,
            'image': image
        })
    
    # Salva o carrinho atualizado na sessão
    session['cart'] = cart

    return redirect(url_for('cart'))  # Redireciona para a página do carrinho

# Página de catálogo
@app.route("/catalogo")
def catalogo():
    """
    Exibe o catálogo de produtos.
    """
    return render_template('catalogue.html', PRODUCTS=PRODUCTS)

@app.route("/admin/catalogo")
def catalogo_admin():
    """
    Exibe o catálogo de produtos para administradores.
    """
    return render_template('catalogue-admin.html', PRODUCTS=PRODUCTS)

@app.route("/user/catalogo")
def catalogo_user():
    """
    Exibe o catálogo de produtos para usuários logados.
    """
    return render_template('catalogue-logged.html', PRODUCTS=PRODUCTS)

# Página de administração de produto
@app.route("/admin/product/<int:product_id>", methods=["GET", "POST"])
def admin_product(product_id):
    """
    Exibe e permite editar ou excluir um produto no catálogo do administrador.
    
    Retorna:
        Response: Renderiza o formulário de edição ou redireciona após exclusão ou atualização.
    """
    # Encontra o produto pelo ID
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return redirect(url_for('catalogo_admin'))  # Redireciona se o produto não for encontrado

    if request.method == 'POST':
        # Se o botão de exclusão for pressionado, exclui o produto
        if 'delete' in request.form:
            PRODUCTS.remove(product)
            # Salva a lista de produtos atualizada
            save_products(PRODUCTS)
            return redirect(url_for('catalogo_admin'))  # Redireciona para o catálogo de administrador
        
        # Caso contrário, atualiza o produto
        product['name'] = request.form['name']
        product['description'] = request.form['description']
        
        # Converte o preço para float antes de atualizar
        try:
            product['price'] = float(request.form['price'])  # Garantir que o preço seja um número
        except ValueError:
            return render_template('admin_product.html', product=product, error="Preço inválido, deve ser um número.")
        
        product['sizes'] = request.form.getlist('sizes')  # Assumindo que os tamanhos são selecionados como checkboxes ou múltiplos selects

        # Se houver um tamanho 'outro', salva-o
        other_size = request.form.get('other_size')
        if other_size:
            product['sizes'].append(other_size)

        # Salva a lista de produtos atualizada
        save_products(PRODUCTS)
        
        # Redireciona para a mesma página para ver as informações atualizadas
        return redirect(url_for('admin_product', product_id=product_id))

    # Renderiza o template para edição do produto
    return render_template('admin_product.html', product=product)

# Página para adicionar um produto
@app.route("/admin/product/add", methods=["GET", "POST"])
def add_product():
    """
    Função para adicionar um novo produto ao catálogo.
    
    Retorna:
        Response: Renderiza o formulário para adicionar o produto ou redireciona para o catálogo de admin após adicionar.
    """
    if request.method == 'POST':
        # Extrai os dados do formulário
        name = request.form['name']
        description = request.form['description']
        
        try:
            price = float(request.form['price'])  # Garantir que o preço seja um número
        except ValueError:
            return render_template('add_product.html', error="Preço inválido, deve ser um número.")
        
        sizes = request.form.getlist('sizes')  # Obtém a lista de tamanhos (P, M, G, GG, etc.)
        
        # Se houver um tamanho 'outro', adiciona
        other_size = request.form.get('other_size')
        if other_size:
            sizes.append(other_size)
        
        # Manipula o upload da imagem
        image = request.files['image']
        image_filename = None
        if image:
            image_filename = os.path.join('app/static/images', image.filename)  # O caminho pode ser alterado conforme necessário
            image.save(image_filename)

        # Cria um novo ID para o produto (incrementando com base no ID mais alto atual)
        product_id = max([p['id'] for p in PRODUCTS], default=0) + 1

        # Cria um novo objeto de produto
        new_product = {
            'id': product_id,
            'name': name,
            'description': description,
            'price': price,
            'sizes': sizes,
            'image': image_filename
        }

        # Adiciona o novo produto à lista e salva
        PRODUCTS.append(new_product)
        save_products(PRODUCTS)

        return redirect(url_for('catalogo_admin'))  # Redireciona para a página do catálogo de administrador

    return render_template('add_product.html')  # Renderiza o formulário para adicionar um produto

# Atualizar a quantidade de um produto no carrinho
@app.route("/update_cart_quantity/<int:product_id>/<size>", methods=["POST"])
def update_cart_quantity(product_id, size):
    """
    Atualiza a quantidade de um produto no carrinho.
    """
    cart = session.get('cart', [])
    new_quantity = int(request.form['quantity'])
    
    for item in cart:
        if item['id'] == product_id and item['size'] == size:
            item['quantity'] = new_quantity
            break
    
    session['cart'] = cart
    return redirect(url_for('cart'))

# Remover um produto do carrinho
@app.route("/remove_from_cart/<int:product_id>/<size>", methods=["POST"])
def remove_from_cart(product_id, size):
    """
    Remove um produto específico do carrinho de compras.
    """
    cart = session.get('cart', [])
    cart = [item for item in cart if not (item['id'] == product_id and item['size'] == size)]
    session['cart'] = cart
    return redirect(url_for('cart'))

# Página de checkout
@app.route("/checkout")
def checkout():
    """
    Exibe a página de checkout com os itens do carrinho e o total calculado.
    """
    cart = session.get('cart', [])
    total_price = sum(item['price'] * item['quantity'] for item in cart)  # Calcula o preço total
    return render_template('checkout.html', cart=cart, total_price=total_price)
