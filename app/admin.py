from app import app
from flask import render_template, request

@app.route("/admin")
def homeAdmin():
    return render_template('homeAdmin.hmtl', par1='Chama', par2='Admin')

@app.route("/produtoadmin")
def produtoAdmin():
    return render_template('produtoAdmin.html')

@app.route("/listaprodutoadmin")
def listaProdutoAdmin():
    return render_template('listaProdutoAdmin.html')