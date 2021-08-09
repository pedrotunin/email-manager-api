# Email Manager API

Uma API construída com Node.js com a finalidade de gerenciar uma fila para envio de e-mails.

## Tecnologias
- Node.js
- Express.js
- Knex.js
- Nodemailer
- Cron
- JWT

## Requisitos
- Node.js v14.17.4
- PostgreSQL v12.7

## Instalação
Após clonar o repositório, será necessário configurar o banco de dados PostgreSQL, executando os comando do arquivo **database.sql** num banco de dados já criado.
Após finalizado a configuração do banco de dados, será necessário criar o arquivo **.env** na raiz do projeto, copiando a estrutura do arquivo **.env.example** e inserindo os valores do seu ambiente.
Por fim, deverá abrir o terminal e rodar os seguintes comandos:
``` 
cd email-manager-api
npm i
node src/index.js
```

## Utilização
- Primeiro um **secret** deve ser criado, através do endpoint (POST) **/api/secret**, passando o secret no corpo da requisição. O secret será utilizado para cadastrar novos usuários na API.
- Cadastrar um usuário, através do endpoint (POST) **/api/user**, passando email, senha e o secret criado anteriormente.
- Fazer login, através do endpoint (POST) **/api/user/login**, passando email e senha. Se logado com sucesso, um token será retornado. Guarde o token, ele será obrigatório para todas outras operações da API. Por padrão, o token tem validade de 1 hora.

## Endpoints
**Obs:** Todas as rotas abaixo precisam do header Authorization="Bearer **token**", sendo **token** o token que você recebe ao fazer login.
- (POST) **/api/email**: insere um e-mail na fila de envio
    - **Corpo da requisição**:
        - (String) from: Nome de quem envia
        - (String) to: E-mail do destinatário
        - (String) subject: Assunto do e-mail
        - (String) (Opcional) text: texto do corpo do e-mail
        - (String) (Opcional) html: código HTML para construir o corpo do e-mail
- (GET) **/api/email**: retorna todos os e-mails enviados ou não da fila
- (GET) **/api/email/sent**: retorna todos os e-mails enviados da fila
- (GET) **/api/email/notSent**: retorna todos os e-mail não enviados da fila
- (GET) **/api/email/amountSentToday**: retorna a quantidade de e-mails enviados no dia atual
- (DELETE) **/api/email/$id**: deleta o e-mail com id=**$id**
- (PUT) **/api/email/$id**: altera o status de envio do e-mail com id=**$id** para enviado.

## Licença
MIT
