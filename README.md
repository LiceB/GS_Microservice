# Global Solution “Tecnologia Aplicada à Saúde: Conquistas e Tendências”

A FIAP se uniu a HAPVIDA para, por meio da tecnologia, promover ações para prevenção de problemas na saúde e melhoria da qualidade de vida.

Rode o seguinte comando para ter acesso aos pacotes node

```
npm install
```

## Instruções para executar o Docker

## Criar a imagem

Vamos criar a imagem a partir do dockerfile. Precisamos executar o local do dockerfile

```
docker build -t app-node .
```

## Criar o container node

Vamos criar um container baseado na imagem que acabamos de criar.

```
docker run -p 3000:3000 -d app-node
```

## Criar um container mysql

Para este exemplo é importante deixarmos claro que iremos utilizar uma imagem existente.

```
docker run --name database-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql
```

## Instruções para executar o sql

## Acessar o container e executar um bash

Vamos acessar o container para executar o script.

```
docker exec -it database-mysql /bin/bash
```

## Após acessar vamos logar no mysql

```
mysql -uroot -p123
```

## Vamos criar a database

```
create database if not exists fiap;
```

## Vamos agora acessar a database

```
use fiap;
```

## Criar as tabelas necessárias

```
create table if NOT exists objetivos (
    id INT(11) AUTO_INCREMENT,
    ods VARCHAR(3),
    descricao_global VARCHAR(200),
    descricao_brasil VARCHAR(200),
    PRIMARY KEY(id)
);

create table if not exists indicadores (
    id INT(11) AUTO_INCREMENT,
    ods VARCHAR(5),
    id_objetivo INT(11),
    descricao VARCHAR(200),
    PRIMARY KEY (id),
    FOREIGN KEY(id_objetivo) REFERENCES objetivos(id)
);

create table IF NOT EXISTS ods (
    id INT(11) AUTO_INCREMENT,
    id_objetivo INT(2),
    id_indicadores INT(2),
    codigo VARCHAR(3),
    regiao VARCHAR(200),
    taxa DECIMAL(10,2),
    ano INT(4),
    PRIMARY KEY (id),
    FOREIGN KEY(id_objetivo) REFERENCES objetivos(id),
    FOREIGN KEY(id_indicadores) REFERENCES indicadores(id)
);

```

## Inserindo dados nas tabelas

```
insert into objetivos(ods, descricao_global, descricao_brasil) values('3.1', 'Até 2030, reduzir a taxa de mortalidade materna global para menos de 70 mortes por 100.000 nascidos vivos.', 'Até 2030, reduzir a razão de mortalidade materna para no máximo 30 mortes por 100.000 nascidos vivos.');

insert into indicadores(ods, id_objetivo, descricao) values('3.1.1', 1, 'Razão de mortalidade materna');

insert into ods(id_objetivo, id_indicadores, codigo, regiao, taxa, ano) values(1, 1, '3.1','Região Amazônica Brasileira',19.4,2004);
```

## Backend sendo executado no insomnia

## Criando volumes para persistir os dados do banco

```
docker volume create dados-do-banco
```

```
docker stop database-mysql
```

```
docker rename database-mysql db
```

```
docker run --name database-mysql -v /db/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql
```
