const url = 'https://pokeapi.co/api/v2/pokemon/'
let cardContainer = document.querySelector("#card")

let numeroPagina = 0




llamarApi()


function llamarApi(param = url) {

    fetch(param)
        .then((response) => response.json())
        .then((data) => {

            pokemon = (data.results)

            pokemon.forEach(element => {

                fetch(element.url)
                    .then((response1) => response1.json())
                    .then((data1) => {


                        let movesURL = data1.moves[0].move.url

                        fetch(movesURL)
                            .then((response2) => response2.json())
                            .then((data2) => {

                                let textEntries = data2.flavor_text_entries

                                let moveNames = data2.names

                                let foundObject = textEntries.find(obj => obj.language.name === 'es');

                                let foundName = moveNames.find(obj => obj.language.name === 'es')

                                // console.log(element.name)

                                // console.log(foundObject)

                                // console.log(foundObject.language.name)

                                // console.log(textEntries.indexOf(foundObject))

                                cardContainer.innerHTML += `<div class="col-12 mt-2 mb-2">
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
                                            </div>`
                            })
                    })
            });
        })
}




function llamarApiNext() {

    console.log('function next')

    numeroPagina += 20

    console.log(numeroPagina)

    let urlApiNext = `${url}?offset=${numeroPagina}`

    cardContainer.innerHTML = '';

    llamarApi(urlApiNext)

}


function llamarApiNext() {

    console.log('function next')

    numeroPagina += 20

    console.log(numeroPagina)

    let urlApiNext = `${url}?offset=${numeroPagina}`

    cardContainer.innerHTML = '';

    llamarApi(urlApiNext)

}

function llamarApiBefore() {

    if (numeroPagina > 0) {

        numeroPagina -= 20

        console.log(numeroPagina)

        let urlApiBefore = `${url}?offset=${numeroPagina}`

        cardContainer.innerHTML = '';

        llamarApi(urlApiBefore)

    }
}


