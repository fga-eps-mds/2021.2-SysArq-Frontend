
## Como contribuir?
* Navegue pelas issues criadas no repositório para entender o que o projeto está precisando no momento.
* Se identificar algo novo, crie uma issue utilizando um dos templates.
* Crie uma branch baseada na *devel* e desenvolva a solução (verificar a [política de commits](#política-de-commits)).
* Para usuários externos, trabalhe no fork do projeto.
* Ao finalizar a implementação, abra um *Pull Request* que iremos revisar.

## Política de branches

Nossa política de branches segue algumas características do Gitflow e é dividida da seguinte forma:

### *main*

É a branch de produção, nela estará a versão mais estável e validada do projeto. Por isso, commits e pushes são bloqueados para garantir a segurança. A main é atualizada via *Pull Request* da *devel*.

### *devel*

Trata-se da branch de desenvolvimento, aonde recebe novas features e correções das *branches de features*. Ao chegar num ponto estável de release, é feito o *merge* com a *main*.

### *branch de feature*

É a branch aonde as novas features e correções destacadas nas issues são desenvolvidas. Ao finalizar a implementação, é feito um *Pull Request* para a *devel*. Sua nomeclatura é da seguinte forma:

```
<número da issue>-descricao_da_feature
 ```
 
 Ex: 6-cadastro_de_usuarios
 
### *branch de hotfix*

É a branch utilizada para corrigir bugs identificados em produção, sendo assim, é criada a partir da *main* e segue o seguinte padrão:

```
hotfix_descricao_do_bug
```

## Política de commits

O  commit deve descrever de forma objetiva as modificações feitas e devem ser escritos em **português**.

### Co-autoria

Durante os pareamentos, deve-se identificar os autores que trabalharam em conjunto no commit, por exemplo:
```
"Cria tela de login de usuários


Co-authored-by: <nome> <email@dominio.com>
Co-authored-by: <nome> <email@dominio.com>"
```



