Front-end:

Link: https://github.com/Insigthfy/front
Branch de entrega final: main
Ciclo de branchs: criação de Pull Requests com aprovação de outro membro a partir de uma branch nomeada com a descrição da tarefa.
Descrição do repositório: Projeto destinado ao front-end do Insightfy, que conta com a aplicação Next.js. Projeto é divido em pastas e contém arquivos para instalação de pacotes e configurações do projeto em sua raiz.

Back-end:

Link: https://github.com/Insigthfy/back
Branch de entrega final: main
Ciclo de branchs: criação de Pull Requests com aprovação de outro membro a partir de uma branch nomeada com o padrão definido. (feat/descricaoTarefa)
Descrição do repositório: Projeto destinado ao back-end do Insightfy, que conta com a aplicação Nest. Projeto é divido em pastas e contém arquivos para instalação de pacotes e configurações do projeto em sua raiz. Segue o modelo de Module, Controller, Service padrão do Nest e utiliza o mongoose como ORM.


Como usar a aplicação?
Para que você possa utilizar a aplicação, é preciso que ambos os projetos (front e back) estejam sendo executados. Dessa maneira ao abrir sua aplicação front-end no navegador ela estará disponível para navegação. A utilização do cabeçalho permite ir para a página principal (/home), a qual você consegue explorar tudo que temos para oferecar, bases, formulários e dashboard.

# Readme

## Getting Started

Instal o node caso ainda não tenha: 
[LINK](https://nodejs.org/en/download/package-manager)

Instale os pacotes da aplicação:

```bash
npm install
```

## Importante

Para que seja possível executar o projeto, o arquivo .env precisa ser configurado. Como contém informações privadas e internas, os dados da .env foram enviados via Teams.

Agora que está tudo configurado, podemos rodar nosso back-end.

Para rodar no modo de desenvolvimento use:

```bash
npm run start:dev
```

Após executar você pode acessar o [Swagger UI](http://localhost:8080/) da nossa API.

A aplicação roda por padrão na porta 8080, verifique se ela já está sendo usada
