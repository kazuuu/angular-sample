# 7comm-angular
A Website desenvolvido com o framework Angular.

Para facilitar a diagramação, foi utilizado o bootstrap do pacote ng-bootstrap (https://ng-bootstrap.github.io/#/getting-started)

Este projeto contempla uma arquitetura base com página home, processo de login, cadastro e dashboard.

OBS 1: Este projeto necessita de uma WebAPI com autenticação OAuth.

OBS 2: Este é um projeto é didatico realizado pela 7Academy - centro de treinamentos da 7COMm.

## Passo a passo de como este projeto foi desenvolvido ##

1. Criar um novo projeto do angular com stylesheet format SCSS e routing implementado.
- ng new app_name

2. Instalar o ng-bootstrap
- ng add @ng-bootstrap/ng-bootstrap

2. Criar uma pasta chamada "pages" que ficará dentro do diretório '\src' para colocarmos todas as páginas do site.

3. Criar as paginas home, login, dashboard.
- ng g c pages/home, pages/login, pages/dashboard
- Deletar os arquivos de testes (*.spec.ts) pois não utilizaremos neste projeto.

4. Configurar as respectivas rotas das paginas criadas. Sendo que a Home será a rota default caso não seja passada nenhuma rota: ''

5. Diagramar a pagina base do angular (app.component.html) e colocar a tag do módulo de routing no lugar.

6. Diagramar uma pagina simples da home utilizando Bootstrap Jumbotron Template e colocar o botão para ir para a pagina de login.

7. Diagramar a tela de login com template do bootstrapl e ir para o dashboard
- Utilizar o NgModel ao invés de form control nos inputs para efetuar o login e senha

8. Diagramar o DashBoard

9. Criar o AuthService com as funcoes de Login e Logout, e propriedades do Current User e Access Token
- Instalar o ngx-toastr para notificações.
- Instalar o HttpClient

10. Implementar o Http Interceptor para colocar o authorization no header das requisições http.


### Install ###
1. Configurar o endpoint da API nas variáveis do Environment
2. ng serve
