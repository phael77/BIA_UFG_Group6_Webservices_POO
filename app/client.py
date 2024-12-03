from flask import render_template, request, redirect, url_for, jsonify, session
from app import app
import json
import os

# Product data for demonstration (static)
PRODUCTS = [
    {
        "id": 1,
        "name": "Produto Exemplo",
        "description": "Este é um exemplo de descrição do produto. Aqui você pode colocar informações detalhadas sobre o produto.",
        "price": 99.99,
        "image": "static/images/product.jpg"
    }
]

# Página inicial
@app.route("/")
def home():
    if 'username' in session:
        # Redireciona para a página específica do perfil
        if session.get('profile') == 1:
            return redirect(url_for('home_loggedin'))  # Usuário comum
        elif session.get('profile') == 2:
            return redirect(url_for('home_admin'))  # Administrador
    return render_template('index.html')

# Página do usuário logado
@app.route("/user")
def home_loggedin():
    return render_template('index-logged.html')

# Página de admin
@app.route("/admin")
def home_admin():
    return render_template('index-admin.html')

# Página de login
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        
        # Simulação de verificação de usuário (substitua por sua lógica real de autenticação)
        if username == "user" and password == "password":
            session['username'] = username
            session['profile'] = 1  # Usuário comum
            return redirect(url_for('home_loggedin'))
        elif username == "admin" and password == "admin":
            session['username'] = username
            session['profile'] = 2  # Administrador
            return redirect(url_for('home_admin'))
        else:
            return render_template('login.html', error="Usuário ou senha inválidos.")
    return render_template('login.html')

# Página de produto (exemplo estático)
@app.route("/product/<int:product_id>")
def product(product_id):
    # Encontra o produto pelo ID
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return redirect(url_for('home'))  # Redireciona caso o produto não exista
    
    return render_template('product.html', product=product)

# Página do carrinho de compras
@app.route("/cart")
def cart():
    # Recupera o carrinho da sessão
    cart = session.get('cart', [])
    return render_template('cart.html', cart=cart)

# Adicionar ao carrinho
@app.route("/add_to_cart/<int:product_id>", methods=["POST"])
def add_to_cart(product_id):
    # Encontra o produto
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return redirect(url_for('home'))  # Redireciona caso o produto não exista
    
    # Recupera o carrinho da sessão
    cart = session.get('cart', [])
    
    # Verifica se o produto já está no carrinho
    existing_item = next((item for item in cart if item['id'] == product_id), None)
    if existing_item:
        existing_item['quantity'] += 1  # Aumenta a quantidade
    else:
        # Adiciona o produto com quantidade 1
        cart.append({'id': product_id, 'name': product['name'], 'price': product['price'], 'quantity': 1, 'image': product['image']})
    
    # Atualiza o carrinho na sessão
    session['cart'] = cart
    
    return redirect(url_for('cart'))  # Redireciona para a página do carrinho

# Roteamento para logout
@app.route("/logout")
def logout():
    session.pop('username', None)
    session.pop('profile', None)
    session.pop('cart', None)  # Limpa o carrinho
    return redirect(url_for('home'))

