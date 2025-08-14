const pokeApi = {}

// Converte os dados da API para o model Pokémon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // Adiciona os stats do Pokémon
    pokeDetail.stats.forEach(stat => {
        pokemon.stats[stat.stat.name] = stat.base_stat
    })

    return pokemon
}

// Pega os detalhes de um Pokémon específico
pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// Pega uma lista de Pokémon com offset e limit
pokeApi.getPokemons = (offset = 0, limit = 51) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonsDetails)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
