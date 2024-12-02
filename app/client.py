from app import app
from flask import render_template, request

@app.route("/")
def home():
    return render_template('index.html', par1="Boa tarde", par2="Cliente")

@app.route("/login")
def login():
    return render_template('login.html')

@app.route("/signin")
def signin():
    return render_template('cadastro.html')

@app.route("/autentica", methods=['POST'])
def autentica():
    user = request.form['user']

@app.route("/cart")
def carrinho():
    return render_template('cart.html')

