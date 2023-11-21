create database if not exists fiap;
use fiap;

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

insert into objetivos(ods, descricao_global, descricao_brasil) values('3.1', 'Até 2030, reduzir a taxa de mortalidade materna global para menos de 70 mortes por 100.000 nascidos vivos.', 'Até 2030, reduzir a razão de mortalidade materna para no máximo 30 mortes por 100.000 nascidos vivos.');

insert into indicadores(ods, id_objetivo, descricao) values('3.1.1', 1, 'Razão de mortalidade materna');

insert into ods(id_objetivo, id_indicadores, codigo, regiao, taxa, ano) values(1, 1, '3.1','Região Amazônica Brasileira',19.4,2004);