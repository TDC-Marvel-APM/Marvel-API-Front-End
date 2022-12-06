# Marvel-API-NodeJS

![](https://i.pinimg.com/originals/37/53/1d/37531d30ac17fb068e8e9153b67d6278.gif)

## Sobre
Projeto feito para demonstração de Execução de APM RUN com ELK(Elastic, Logstash e Kibana) na palestra sobre Garçom, traz um RUM para minhas aplicações Front-end

Versão do NodeJs - v16.13.2

Versão do NPM - 8.10.0

## Passo a passo de como utilizar 💡


1. Para podermos utilizar precisaremos criar o arquivo .env dentro do nosso projeto, nele ficará a parte de variaveis de ambiente da nossa aplicação
2. Acesse o site https://cloud.mongodb.com/ e crie sua conta por lá
3. Acessando sua conta crie um novo projeto e deixe o nome TDC - Testes e em add membros deixe como está no caso ele vai deixar você seu usuario de cadastro como owner
4. depois de criar clique na aba Network Access e clicando nele clica em Add IP Address e seleciona ALLOW ACCESS FROM ANYWHERE e clica em confirm
5. depois de criar clique na aba clica em Add New Database User e em Password Authentication coloque um user e passwoard que desejar
6. Clica na aba de DataBase clica em Create e seleciona o banco share, e clica em confirm, ele demora um pouco para carregar mas logo ja estará criado seu banco
7. Clica em Connect e logo em seguida seleciona connect your application e nele você  receberá na parte Add your connection string into your application code a url do nosso banco, copia e cola isso dentro do seu env dessa maneira: MONGO=<suaURL>
8. no .env coloque tambem PORT=8080
9. antes de iniciar rode o npm i ou npm install
10. Para ver a API com o teste funcionando podemos rodar o comando npm run test

11.Dentro do projeto vocês verão um arquivo chamado Marvel Universe.postman_collection.json com ele vocês conseguem importar no seu postman e utilizar as rotas desse projeto



## Tecnologias usadas nesse projeto projeto 💻

- 🍃 [MongoDB](https://www.mongodb.com/pt-br)
- 💎 [NodeJS](https://nodejs.org/en/)
- 🦌 [ELK](https://www.elastic.co/pt/what-is/elk-stack)
- 💌 [Postman](https://www.postman.com/)
- 🧪 [React](https://pt-br.reactjs.org/)
- 🌼 [Elastic](https://www.elastic.co/pt/)
