-- Active: 1674656812688@@127.0.0.1@3306
CREATE TABLE users(
    user_id TEXT UNIQUE NOT NULL PRIMARY KEY,
    name TEXT  NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
INSERT INTO users
VALUES("u001", "Ana","ana@mail.com", "ana123"),
      ("u002", "Joao","joao@mail.com", "joao123"),
      ("u003", "Liz","liz@mail.com", "liz123"),
      ("u004", "Teo","teo@mail.com", "teo123"),
      ("u005", "Eva","eva@mail.com", "eva123");

CREATE TABLE tasks(
    task_id TEXT UNIQUE PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT DEFAULT  (DATETIME('now', 'localtime')) NOT NULL,
    status INTEGER DEFAULT (0) NOT NULL
);

INSERT INTO tasks(task_id, title, description)
VALUES
("t001", "Header", "Criar o componente Header do site"),
("t002", "Footer", "Criar o componente Footer do site"),
("t003", "Carrinho de compras", "Criar carrinho de compas"),
("t004", "Pagamento", "Criar área de pagamento com diversas formas"),
("t005", "Área de login", "Criação de banco de dados do usuário"),
("t006", "Área de cadastro", "Criação de inputs que envia dados do usuário pro banco de dados"),
("t007", "Rotas", "Criar conexão entre as paginas"),
("t008", "Implementar produtos", "Criar conexão entre as paginas"),
("t009", "Filtros de busca", "Criar filtro de busca por nome ou categoria"),
("t010", "Filtros de ordenação", "Filtrar ordenação por preço ou ordem alfabética");

SELECT * FROM tasks;
SELECT * FROM users;
SELECT * FROM users_tasks;

CREATE TABLE users_tasks (
    user_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks (task_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
INSERT INTO users_tasks
VALUES
("u001","t005"),
("u002","t001"),
("u002","t002"),
("u003","t003"),
("u003","t004"),
("u005","t003"),
("u005","t004"),
("u004", "t007");


