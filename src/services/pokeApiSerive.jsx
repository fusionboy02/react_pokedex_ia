
const BASE_URL = "https://pokeapi.co/api/v2/";

function getPokemons(take = 151) {
    const url = `${BASE_URL}/pokemon?limit=${take}`;

    return fetch(url).then((response) => response.json());
}

export default getPokemons;