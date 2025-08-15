```markdown
# Pokédex Web

Uma aplicação web que consome a **PokéAPI** para listar Pokémons de forma dinâmica, exibindo nome, número, tipos e imagem, com funcionalidade de "Carregar mais".

## 📂 Estrutura de Pastas

pokedex/
│
├── assets/
│   ├── css/        # Arquivos de estilo (CSS)
│   ├── js/         # Código JavaScript do projeto
│       ├── main.js         # Controle principal do carregamento e exibição dos Pokémons
│       ├── poke-api.js     # Conexão e conversão de dados da PokéAPI
│       ├── pokemon-model.js # Classe modelo para representar Pokémons
│
├── index.html      # Página principal
├── README.md       # Documentação do projeto

---

## 🚀 Funcionalidades

- Listagem dinâmica de Pokémons da **PokéAPI**
- Exibição de:
  - Número
  - Nome
  - Tipos
  - Imagem oficial (Dream World)
- Paginação com botão **"Carregar mais"**
- Limite configurável para exibir apenas a 1ª geração (151 Pokémons)

---

## 📜 Descrição dos Arquivos

### **pokemon-model.js**
Define a classe `Pokemon`, que representa um Pokémon no formato utilizado pelo projeto.
```js
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}
````

---

### **poke-api.js**

Responsável por se conectar à **PokéAPI**, buscar os dados e convertê-los para o formato do modelo `Pokemon`.

**Funções principais:**

* **`convertPokeApiDetailToPokemon(pokeDetail)`**

  * Converte os dados crus da API para um objeto `Pokemon`.
* **`pokeApi.getPokemonDetail(pokemon)`**

  * Faz o `fetch` para buscar detalhes de um Pokémon a partir de sua URL.
* **`pokeApi.getPokemons(offset, limit)`**

  * Busca uma lista de Pokémons com paginação.
  * Encadeia chamadas para obter os detalhes completos de cada Pokémon.
  * Retorna uma Promise contendo uma lista de objetos `Pokemon`.

---

### **main.js**

Gerencia o fluxo da aplicação e insere os Pokémons no HTML.

**Principais pontos:**

* Seleciona elementos HTML:

  ```js
  const pokemonList = document.getElementById("pokemonList");
  const loadMoreButton = document.getElementById("loadMoreButton");
  ```
* Configurações de limite:

  ```js
  const limit = 20;
  let offset = 0;
  const maxRecords = 151; // Limita à primeira geração
  ```
* **`loadPokemonItens(offset, limit)`**

  * Chama `pokeApi.getPokemons()`
  * Gera o HTML de cada Pokémon usando `.map()` e insere na página.
* Evento de clique no botão **"Carregar mais"**

  * Incrementa `offset`
  * Carrega mais Pokémons até atingir o limite de 151
  * Remove o botão ao chegar no fim

---

## 🔗 API Utilizada

* **PokéAPI**: [https://pokeapi.co/](https://pokeapi.co/)

---

## 💻 Tecnologias

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* Promises

---

## 📷 Demonstração

*Em construção*

---

## 📌 Como Executar o Projeto

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/seu-usuario/pokedex.git
   ```
2. **Acessar a pasta**

   ```bash
   cd pokedex
   ```
3. **Abrir o arquivo `index.html` no navegador**

   * Basta clicar duas vezes no arquivo ou abrir pelo VSCode com a extensão Live Server.

---
