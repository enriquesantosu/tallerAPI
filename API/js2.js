const url = 'https://pokeapi.co/api/v2/pokemon/'
let cardContainer = document.querySelector("#card")
let numeroPagina = 0
// const search = document.querySelector("#searchBar");
const button = document.querySelector("#searchButton");


function fetchPokemonList(param = url) {
    fetch(param)
        .then((response) => response.json())
        .then((data) => {
            if (data.results) {
                // When fetching the default list, data.results is an array
                let pokemonData = data.results;
                fetchPokemonData(pokemonData);
            } else {
                // When searching for a specific Pokémon, data is an individual Pokémon object
                let pokemonData = [data];
                fetchPokemonData(pokemonData);
            }
        })
}


function fetchPokemonData(pokemonData) {

    if (pokemonData.length == 1) {

        console.log(pokemonData)

        const data1 = pokemonData

        fetchMoveData(data1)

    } else {

        pokemonData.forEach(pokemon => {
            fetch(pokemon.url)
                .then((response) => response.json())
                .then((data1) => {

                    fetchMoveData(data1)

                })
        });

    }

}


function fetchMoveData(data1) {

    let firstMove;

    if (data1.length == 1) {

        firstMove = data1[0].moves[0].move.url;

    } else {

        firstMove = data1.moves[0].move.url

    }

    fetch(firstMove)
        .then((moves) => moves.json())
        .then((data2) => {

            let textEntries = data2.flavor_text_entries

            let moveNames = data2.names

            let foundObject = textEntries.find(obj => obj.language.name === 'es');

            let foundName = moveNames.find(obj => obj.language.name === 'es')

            renderCard(data1, foundObject, foundName)
        })

}




function renderCard(data1, foundObject, foundName) {

    if (data1.length == 1) {

        cardContainer.innerHTML = ``

        cardContainer.innerHTML += `<div class="col-6 mt-2 mb-2">
    <div class="cardBody">
        <div class="hp d-flex justify-content-end">
            <span class="d-flex align-items-center">
                <p class="textHP mb-0">HP</p>
                <p class="numberHP mb-0">${data1[0].stats[0].base_stat}</p>
            </span>
        </div>
        <div class="picture d-flex justify-content-center" style="height: 150px;">
            <img src="${data1[0].sprites.front_default}"
                alt="">
        </div>
        <div class="name d-flex justify-content-center">
            <p style="font-weight: bold;">${data1[0].name}</p>
        </div>
        <div class="types d-flex justify-content-center">
            <p>${data1[0].types[0].type.name}</p>
        </div>
        <div class="row d-flex justify-content-between">
        <div class="types col-6">
            <p>${foundName.name}</p>
        </div>
        <div class="types col-6">
            <p>${foundObject.flavor_text}</p>
        </div>
        </div>
        <div class="stats d-flex justify-content-between">
            <div class="attack d-flex flex-column align-items-center">
                <p class="mb-0">${data1[0].stats[1].base_stat}</p>
                <p>Attack</p>
            </div>
            <div class="defense d-flex flex-column align-items-center">
                <p class="mb-0">${data1[0].stats[2].base_stat}</p>
                <p>Defense</p>
            </div>
            <div class="speed d-flex flex-column align-items-center">
                <p class="mb-0">${data1[0].stats[5].base_stat}</p>
                <p>Speed</p>
            </div>
        </div>
    </div>
    </div>
    `

    } else {

        cardContainer.innerHTML += `<div class="col-6 mt-2 mb-2">
        <div class="cardBody">
            <div class="hp d-flex justify-content-end">
                <span class="d-flex align-items-center">
                    <p class="textHP mb-0">HP</p>
                    <p class="numberHP mb-0">${data1.stats[0].base_stat}</p>
                </span>
            </div>
            <div class="picture d-flex justify-content-center" style="height: 150px;">
                <img src="${data1.sprites.front_default}"
                    alt="">
            </div>
            <div class="name d-flex justify-content-center">
                <p style="font-weight: bold;">${data1.name}</p>
            </div>
            <div class="types d-flex justify-content-center">
                <p>${data1.types[0].type.name}</p>
            </div>
            <div class="row d-flex justify-content-between">
            <div class="types col-6">
                <p>${foundName.name}</p>
            </div>
            <div class="types col-6">
                <p>${foundObject.flavor_text}</p>
            </div>
            </div>
            <div class="stats d-flex justify-content-between">
                <div class="attack d-flex flex-column align-items-center">
                    <p class="mb-0">${data1.stats[1].base_stat}</p>
                    <p>Attack</p>
                </div>
                <div class="defense d-flex flex-column align-items-center">
                    <p class="mb-0">${data1.stats[2].base_stat}</p>
                    <p>Defense</p>
                </div>
                <div class="speed d-flex flex-column align-items-center">
                    <p class="mb-0">${data1.stats[5].base_stat}</p>
                    <p>Speed</p>
                </div>
            </div>
        </div>
        </div>
        `

    }

}

fetchPokemonList()

function llamarApiNext() {

    console.log('function next')

    numeroPagina += 20

    console.log(numeroPagina)

    let urlApiNext = `${url}?offset=${numeroPagina}`

    cardContainer.innerHTML = '';

    fetchPokemonList(urlApiNext)

}


function llamarApiBefore() {

    if (numeroPagina > 0) {

        numeroPagina -= 20

        console.log(numeroPagina)

        let urlApiBefore = `${url}?offset=${numeroPagina}`

        cardContainer.innerHTML = '';

        fetchPokemonList(urlApiBefore)

    }
}



button.addEventListener('click', () => {

    const search = document.querySelector("#searchBar");

    let searchValue = search.value;

    console.log(searchValue)

    let urlApiSearch = `${url}${searchValue}`

    console.log(urlApiSearch)

    fetchPokemonList(urlApiSearch)

})