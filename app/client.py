from app import app
from flask import render_template, request

@app.route("/")
def home():
    return render_template('index.html', par1="Boa tarde", par2="Cliente")