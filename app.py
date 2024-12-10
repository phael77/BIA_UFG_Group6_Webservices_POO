from flask import Flask

# Criação do objeto Flask, que representa a aplicação web
app = Flask(__name__)

# Definindo uma chave secreta para gerenciar sessões (importante para funcionalidades como login)
# A chave secreta é usada para proteger dados de sessão, como cookies.
app.secret_key = '1234567890'  # Certifique-se de definir uma chave secreta segura para produção

# Importa as rotas da aplicação, que são definidas em outro arquivo (provavelmente 'routes.py' ou algo similar)
from app.client import *  # Supondo que o arquivo 'client.py' contém as rotas para o cliente

# Condição para rodar a aplicação em modo de desenvolvimento quando o script for executado diretamente
if __name__ == "__main__":
    # O método app.run(debug=True) inicia o servidor de desenvolvimento do Flask com a opção de debug ativada
    app.run(debug=True)
