const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const pokemonDetails = document.getElementById('pokemonDetails')

const limit = 8
let offset = 0
const maxRecords = 151

let loadedPokemons = []

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            loadedPokemons = loadedPokemons.concat(pokemons)

            const newList = pokemons.map((pokemon) => `
                <li class="poke ${pokemon.type}" data-number="${pokemon.number}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                                    <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div
                </li>
            `).join('')

            pokemonList.innerHTML += newList
        })
}

function showPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
        <div class="photo">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <div class="stats">
                <h2>Stats</h2>
                <ol>
                    <li>HP: ${pokemon.stats.hp}</li>
                    <li>Attack: ${pokemon.stats.attack}</li>
                    <li>Defense: ${pokemon.stats.defense}</li>
                    <li>Special-Attack: ${pokemon.stats['special-attack']}</li>
                    <li>Speed: ${pokemon.stats.speed}</li>
                </ol>
            </div>
        </div>
    `
}

pokemonList.addEventListener('click', (event) => {
    const li = event.target.closest('li.poke')
    if (!li) return

    const number = li.getAttribute('data-number')
    const clickedPokemon = loadedPokemons.find(p => p.number == number)
    if (clickedPokemon) showPokemonDetails(clickedPokemon)
})

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
