const url = 'https://pokeapi.co/api/v2/pokemon/'
let cardContainer = document.querySelector("#card")
let numeroPagina = 0


function getPokemonList() {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                resolve(data.results)
            })
            .catch((error) => {
                console.error('the pokemon list was not fetched', error);
                reject(error);
            });
    });
}

function getPokemonData(data) {
    return new Promise((resolve, reject) => {

        const pokemonDataArray = [];

        const fetchPromises = data.map(element => {
            return fetch(element.url)
                .then((response) => response.json())
                .then((data1) => {
                    pokemonDataArray.push(data1);
                })
                .catch((error) => {
                    console.error('Pokemon data was not fetched', error);
                    reject(error);
                });
        });

        Promise.all(fetchPromises)
            .then(() => {
                resolve(pokemonDataArray)
            })
            .catch(() => {
                reject(error)
            })


        console.log(pokemonDataArray);

    })
}

function getPokemonMoves(pokemonDataArray) {
    return new Promise((resolve, reject) => {

        const pokemonMoveArray = [];

        const fetchPromises2 = pokemonDataArray.map(element => {

            // if (!element.moves || element.moves.length === 0) {
            //     return Promise.reject('No moves data available for this Pokémon');
            // }

            const moveUrl = element.moves[0].move.url;

            return fetch(moveUrl)
                .then((response) => response.json())
                .then((data2) => {
                    pokemonMoveArray.push(data2)
                })
                .catch((error) => {
                    console.error('Move data was not fetched', error)
                    reject(error)
                })

        })


        Promise.all(fetchPromises2)
            .then(() => {
                const foundObjectsArray = []
                const foundNamesArray = []

                pokemonMoveArray.map(element => {

                    const textEntries = element.flavor_text_entries

                    const foundObject = textEntries.find(obj => obj.language.name === 'es');

                    const moveNames = element.names

                    const foundName = moveNames.find(obj => obj.language.name === 'es')

                    foundObjectsArray.push(foundObject)

                    foundNamesArray.push(foundName)

                })

                console.log(pokemonMoveArray)
                console.log(foundNamesArray)
                console.log(foundObjectsArray)

                resolve(pokemonDataArray, foundObjectsArray, foundNamesArray)
            })
            .catch((error) => {
                reject(error)
            })


    })



}


function renderCard(pokemonDataArray, foundObjectsArray, foundNamesArray) {

    for (let i = 0; i < pokemonDataArray.length; i++) {
        const pokemon = pokemonDataArray[i];
        const flavorText = foundObjectsArray[i];
        const moveName = foundNamesArray[i];

        cardContainer.innerHTML += `<div class="col-6 mt-2 mb-2">
    <div class="cardBody">
        <div class="hp d-flex justify-content-end">
            <span class="d-flex align-items-center">
                <p class="textHP mb-0">HP</p>
                <p class="numberHP mb-0">${pokemon.stats[0].base_stat}</p>
            </span>
        </div>
        <div class="picture d-flex justify-content-center" style="height: 150px;">
            <img src="${pokemon.sprites.front_default}"
                alt="">
        </div>
        <div class="name d-flex justify-content-center">
            <p style="font-weight: bold;">${pokemon.name}</p>
        </div>
        <div class="types d-flex justify-content-center">
            <p>${pokemon.types[0].type.name}</p>
        </div>
        <div class="row d-flex justify-content-between">
        <div class="types col-6">
            <p>${moveName.name}</p>
        </div>
        <div class="types col-6">
            <p>${flavorText.flavor_text}</p>
        </div>
        </div>
        <div class="stats d-flex justify-content-between">
            <div class="attack d-flex flex-column align-items-center">
                <p class="mb-0">${pokemon.stats[1].base_stat}</p>
                <p>Attack</p>
            </div>
            <div class="defense d-flex flex-column align-items-center">
                <p class="mb-0">${pokemon.stats[2].base_stat}</p>
                <p>Defense</p>
            </div>
            <div class="speed d-flex flex-column align-items-center">
                <p class="mb-0">${pokemon.stats[5].base_stat}</p>
                <p>Speed</p>
            </div>
        </div>
    </div>
    </div>`
    }





}


getPokemonList()
    .then(async (pokemonDataArray) => {
        const foundObjectsArray = await getPokemonMoves(pokemonDataArray);
        const foundNamesArray = foundObjectsArray.map((object) => object.name);

        renderCard(pokemonDataArray, foundObjectsArray, foundNamesArray);
    });
