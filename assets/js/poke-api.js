const pokeApi = {}

//converte o pokemonDetail como veio pela poke APi para o padrão do pokemon-model
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    // acessa a API usando os offset e limite indicadas e trás os resultados como Promise Response
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)

        //O response anterior é passado como parâmetro na função arrow abaixo 
        // e então transformamos em json
        .then((response) => response.json())

        //Porém o json vem com muitos detalhes, então só pegamos os results dele, 
        // que trás os pokemons em si
        .then((jsonBody) => jsonBody.results)

        //Agora temos a lista de pokemons em Json e sem informações inúteis
        //Então mapeamos a lista com map, passando por cada elemento dela e trransformamos em
        //uma lista de requisições dos detalhes dos pokemons
        //é feito um novo fetch para a url dos pokemons(no primeiro fetch veio nome e url deles)
        //quem faz o fetch é a função getPokemonDetail e transforma em json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))

        //agora temos essa lista de requisições, porém precisamos esperar que elas todas terminem
        //o Promisse.all irá fazer essa espera e devolver completa
        .then((detailRequests) => Promise.all(detailRequests))

        //agora temos uma lista de detalhes dos pokemons, que foi pega através da url dentro de cada poke
        .then((pokemonsDetails) => pokemonsDetails)        
}
