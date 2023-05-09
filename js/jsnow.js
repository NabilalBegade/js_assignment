var movies = [
    { title: "The Dark Knight", genre: "action" },
    { title: "Inception", genre: "sci-fi" },
    { title: "Pulp Fiction", genre: "drama" },
    { title: "The Shawshank Redemption", genre: "drama" },
    { title: "The Matrix", genre: "sci-fi" },
    { title: "Jurassic Park", genre: "action" },
    { title: "The Hangover", genre: "comedy" },
    { title: "Avatar", genre: "fantasy" },
    { title: "Interstellar", genre: "sci-fi" },
];

var movieList = document.querySelector(".movie-list");
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var genreSelect = document.getElementById("genre-select");


function generateMovieList() {
    movieList.innerHTML = "";

    var searchTerm = searchInput.value.toLowerCase();
    var selectedGenre = genreSelect.value;

    var filteredMovies = movies.filter(function(movie) {
        var isMatch = true;


        if (searchTerm !== "") {
            isMatch = movie.title.toLowerCase().includes(searchTerm);
        }


        if (selectedGenre !== "all") {
            isMatch = isMatch && movie.genre === selectedGenre;
        }

        return isMatch;
    });

    filteredMovies.forEach(function(movie) {
        var movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        var movieTitle = document.createElement("h3");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;

        var movieInfo = document.createElement("p");
        movieInfo.classList.add("movie-info");
        movieInfo.textContent = "Genre: " + movie.genre;

        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieInfo);

        movieList.appendChild(movieCard);
    });
}


searchButton.addEventListener("click", function() {
    generateMovieList();
});


genreSelect.addEventListener("change", function() {
    generateMovieList();
});


generateMovieList();