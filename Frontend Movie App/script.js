const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort-by-popularity.desc&api_key=30d01760350280522a9d64ca25e9ba3a';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=30d01760350280522a9d64ca25e9ba3a&query=";

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

returnMovies(APILINK);

function returnMovies(url){
    fetch(url).then(res => res.json()).then(data => { 
        console.log(data.results)
        data.results.forEach(movie =>{
            const div_card = document.createElement('div');
            div_card.classList.add('card');
            const div_column = document.createElement('div');
            div_column.classList.add('column');
            const div_row = document.createElement('div');
            div_row.classList.add('row');
            const img = document.createElement('img');
            img.classList.add('thumbnail');
            img.setAttribute('id', 'image');
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            const center = document.createElement('center');

            title.innerHTML=`${movie.title}`;
            img.src = IMG_PATH + movie.poster_path;

            center.appendChild(img);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);   
            div_row.appendChild(div_column);
            main.appendChild(div_row);
        });
    })
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if(searchItem){
        returnMovies(SEARCHAPI + searchItem);
        search.value = '';
    }
});