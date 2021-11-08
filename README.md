[![Build](https://github.com/fga-eps-mds/2021.1-PC-GO1-Frontend/workflows/Compilação/badge.svg)](https://github.com/fga-eps-mds/2021.1-PC-GO1-Frontend/actions/workflows/build.yml)
[![Style](https://github.com/fga-eps-mds/2021.1-PC-GO1-Frontend/workflows/Estilo/badge.svg)](https://github.com/fga-eps-mds/2021.1-PC-GO1-Frontend/actions/workflows/style.yml)
[![Tests](https://github.com/fga-eps-mds/2021.1-PC-GO1-Frontend/workflows/Testes/badge.svg)](https://github.com/fga-eps-mds/2021.1-PC-GO1-Frontend/actions/workflows/test.yml)

# Interface Gráfica do SysArq

[![codecov](https://codecov.io/gh/fga-eps-mds/2021.1-PC-GO1-Frontend/branch/main/graph/badge.svg?token=Y9IOQCM8P3)](https://codecov.io/gh/fga-eps-mds/2021.1-PC-GO1-Frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2021.1-PC-GO1-Frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2021.1-PC-GO1-Frontend)

Interface gráfica do usuário do sistema *[SysArq](https://fga-eps-mds.github.io/2021.1-PC-GO1/)*. 

A interface gráfica é composta pelo design, interface de navegação e ferramentas de interação com o usuário. **[Saiba mais](https://fga-eps-mds.github.io/2021.1-PC-GO1/documentation/)**

## Execução

### Requisitos
 - ***`Docker`*** - [veja como instalar](https://docs.docker.com/engine/install/);
 - ***`docker-compose`***, no mínimo a versão *`1.29.0`* - [veja como instalar](https://docs.docker.com/compose/install/).

### Executar

1. Clone esse repositório - [veja como clonar um repositório](https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository);

2. Crie, utilizando o arquivo ***env-reference***, o *`.env`* dentro da **pasta do repositório**;

3. Execute, dentro da **pasta do repositório**, o comando:
   ```
    sudo docker-compose up
   ```

4. Acesse [http://localhost:3000/](http://localhost:3000) no navegador. 

### Testes e Verificação de Estilo e de Formatação

-  Para **testar** a aplicação, utilize o ***jest***. Por exemplo:
   ```
      sudo docker-compose run app yarn test --coverage --watchAll=false
   ```
   **Observação**: Só serão aceitas contribuições com 90% de cobertura de código.

- Para **verificar o estilo de código** da aplicação, utilize o ***ESLint***. Por exemplo:
   ```
      sudo docker-compose run app yarn lint
   ```
   **Observação**: Só serão aceitas contribuições com o estilo correto.

- Para **verificar a formatação do código** da aplicação, utilize o ***Prettier***. Por exemplo:
   ```
      sudo docker-compose run app yarn checkFormat
   ```
   **Observação**: Só serão aceitas contribuições com a formatação correta.  

**ATENÇÃO**: Execute os comandos dentro da **`pasta`** do repositório.

## Documentação

### Como contribuir

- Leia o [guia de contribuição](CONTRIBUTING.md)
