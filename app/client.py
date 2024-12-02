from app import app
from flask import render_template, request

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/login")
def login():
    return render_template('login.html')

@app.route("/register")
def register():
    return render_template('register.html')

@app.route("/autentica", methods=['POST'])
def autentica():
    user = request.form['user']

