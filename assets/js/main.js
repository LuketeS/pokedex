//recebe os tipos do pokemon, acessando eles em typeSlot depois type e depois name e transforma em uma li
//após criar o modelo de pokemon, nào foi mais necessário essa parte
// function convertPokemonTypesToLi(pokemonTypes){
//     return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
// }

//acessa o html e pega a lista de pokemons pelo seu id pokemonList e tambem o button
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 20;
let offset = 0;

//limita os pokemons para a primeira geração
const maxRecords = 151;


function loadPokemonItens(offset, limit) {
    
    // Essa parte foi inserida diratamente nop pokemons.map abaixo
    //recebe o pokemon em json e transforma em uma li no html
    // function convertPokemonToLi(pokemon){
    //     return `
    //         <li class="pokemon ${pokemon.type}">
    //             <span class="number">#${pokemon.number}</span>
    //             <span class="name">${pokemon.name}</span>

    //             <div class="detail">
    //                 <ol class="types">
    //                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    //                 </ol>
    //                 <img src="${pokemon.photo}" alt="${pokemon.name}">
    //             </div>
    //         </li>
    //     `
    // }

    //chama a função pokeApi.getPokemons, percorre a lista e adiciona cada elemento ao html do site
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {

        const newHtml = pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `
        ).join("")

        pokemonList.innerHTML += newHtml

        //o código abaixo faz o mesmo que o acima, só que o de cima é melhor
        // const listItems = []

        // for (let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
        //     listItems.push(convertPokemonToLi(pokemon))
        // }
            
        // console.log(listItems)      
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens(offset,limit);
    }

    
})
