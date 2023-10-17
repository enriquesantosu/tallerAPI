let urlApi = "https://rickandmortyapi.com/api/character";
let currentPage = 1;

const buttonNext = document.querySelector(".btn2");
const buttonPrevious = document.querySelector(".btn1");
const search = document.querySelector("#searchBar");


console.log(search)

buttonNext.addEventListener('click', () => {
    currentPage++;
    const urlApiNext = `${urlApi}?page=${currentPage}`;
    getApi(urlApiNext);
});

buttonPrevious.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        const urlApiPrevious = `${urlApi}?page=${currentPage}`;
        getApi(urlApiPrevious);
    }
});

getApi();

function getApi(url = urlApi) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            cardContainer = document.querySelector("#cards");
            cardContainer.innerHTML = '';

            data.results.forEach(element => {
                cardContainer.innerHTML += `
                <div class="col-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${element.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">Status: ${element.status}</p>
                        </div>
                    </div>
                </div>`;
            });
        });
}

search.addEventListener('input', (event) => {

    let searchValue = event.target.value;

    console.log(searchValue)

    let urlApiSearch = `${urlApi}/?name=${searchValue}`

    console.log(urlApiSearch)

    getApi(urlApiSearch)

})


