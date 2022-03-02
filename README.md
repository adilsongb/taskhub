# TaskHub &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

<img src="src/images/intro_taskhub.png">

TaskHub é uma aplicação web que registra as tarefas diárias do usuário em forma de checklist.

- Todas as tarefas ficam salvas na data em que foram criadas;
- Quando as tarefas forem concluídas, elas são marcadas com um check.

## 💻 Desenvolvimento

### Desenvolvido com

- React.js
- Firebase
- JavaScript
- HTML
- CSS

### Pré-requisitos

- Node.js: v14.0.0 ou superior

### Configuração do ambiente de desenvolvimento

- Clone este repositório:

```shell
git clone git@github.com:adilsongb/taskhub.git
```

- Acesse o diretório do projeto:

```shell
cd taskhub/
```

- Instale as dependências com o seguinte comando:

```shell
npm install
```

- Execute a aplicação em tempo real com o seguinte comando:

```shell
npm start
```

### Implantação / Publicação

Após o desenvolvimento do código, salve as mudanças usando o Git:

```shell
git add .
git commit -m "New features"
```

Envie as mudanças para o repositório no GitHub:

```shell
git push
```

O processo de Build e de Deploy é feito pelo Firebase através de uma `Action`.

> Qualquer mudança na branch `master` inicia o processo de implantação.
