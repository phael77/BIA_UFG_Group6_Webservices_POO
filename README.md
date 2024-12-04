Webservices - Grupo 6  
Disciplina: Programação Orientada a Objetos  
Bacharelado em Inteligência Artificial

Este repositório contém o trabalho de Webservices desenvolvido pelo Grupo 6 na disciplina de Programação Orientada a Objetos do curso de Bacharelado em Inteligência Artificial. O objetivo do trabalho é construir uma aplicação web utilizando conceitos de programação orientada a objetos e webservices, com o intuito de resolver um problema prático e aplicável.

Descrição do Projeto

A aplicação web desenvolvida simula uma loja online, onde os usuários podem visualizar produtos, adicionar itens ao carrinho de compras, realizar o checkout e gerenciar sua conta. A aplicação também possui uma área administrativa, onde os administradores podem gerenciar produtos e visualizar pedidos.

Funcionalidades:

- Cadastro e login de usuários
- Visualização e pesquisa de produtos
- Carrinho de compras
- Processo de checkout
- Modo escuro para a interface
- Área administrativa para gerenciamento de produtos
- Autenticação e controle de acesso com base no perfil do usuário

Estrutura do Projeto

├── app
│   ├── cart.json                # Armazena os dados do carrinho de compras
│   ├── client.py                # Contém as rotas e lógica para a parte cliente da aplicação
│   ├── __init__.py              # Inicializa o pacote 'app'
│   ├── products.json            # Contém os dados dos produtos
│   ├── __pycache__              # Arquivos compilados automaticamente pelo Python
│   ├── static                   # Arquivos estáticos (imagens, scripts JS, CSS)
│   ├── templates                # Templates HTML para renderização das páginas
│   └── users.json               # Armazena os dados dos usuários
├── app.py                        # Arquivo principal da aplicação Flask
├── arquitetura.txt              # Descrição da arquitetura do sistema
├── README.md                    # Este arquivo de documentação
└── venv                          # Ambiente virtual contendo as dependências

Tecnologias Utilizadas

- Flask: Framework web para construção do back-end.
- HTML, CSS, JavaScript: Tecnologias para a criação da interface do usuário (front-end).
- JSON: Utilizado para persistência de dados (produtos, usuários, carrinho).
- Jinja2: Engine de templates para renderização dinâmica das páginas HTML.

Como Rodar o Projeto

1. Clone o repositório:

   git clone https://github.com/usuario/repo.git

2. Instale as dependências:

   Primeiro, crie um ambiente virtual (caso não tenha um):

   python3 -m venv venv

   Ative o ambiente virtual:

   - No Windows:

     venv\Scripts\activate

   - No Linux/macOS:

     source venv/bin/activate

   Instale as dependências do projeto:

   pip install -r requirements.txt

3. Inicie o servidor Flask:

   python app.py

4. Acesse o projeto:

   Abra seu navegador e acesse http://127.0.0.1:5000.

Testes e Validação

Durante o desenvolvimento, os testes foram realizados manualmente para garantir que as principais funcionalidades estivessem operando corretamente, como login, adição ao carrinho, checkout e alternância para o modo escuro. Para um desenvolvimento futuro, pode-se integrar frameworks de teste como unittest ou pytest para garantir a robustez do sistema.

Contribuições

Este projeto foi desenvolvido por André V. M. Koraleski, Lucas N. Barroso, Raphael A. de L. Soares, Victor G. R. Jacome e Wagner V. A. de Menezes como parte do trabalho de Programação Orientada a Objetos. Contribuições adicionais ou melhorias são bem-vindas.
