from app import app
from flask import render_template, request

@app.route("/admin")
def homeAdmin():
    return render_template('admin.hmtl', par1='Chama', par2='Admin')