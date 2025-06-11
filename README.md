
# Trabalho-de-Banco-de-Dados

Este projeto é um trabalho da disciplina de Banco de Dados do curso de Ciência da Computação na UTFPR, Câmpus Campo Mourão, ministrada pelo Prof. Dr. Eduardo Pena.

Objetivo
💻🎲

Objetivo deste projeto é permitir o desenvolvimento de habilidades práticas no projeto e implementação de um banco de dados, desde a análise inicial dos requisitos até a implementação do banco de dados utilizando SQL e ORM.


Estrutura do Projeto 
📝trabalho é composto por seis fases, descritas a seguir: 
Fase 1: Levantamento de Requisitos 

Fase 2: Projeto Conceitual do Banco de Dados (Modelo ER)

Fase 3: Mapeamento do Modelo de Dados (Projeto Lógico do Banco de Dados) 

Fase 4: Normalização do Banco de Dados na 3ª Forma Normal 

Fase 5: Implementação em SQL 

Fase 6: Desenvolvimento com ORM 

## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.

