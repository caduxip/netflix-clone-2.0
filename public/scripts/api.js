const api_config = Object.freeze({
  key: "d19a1946970f98fae002af7545322879",
  image_base_url: "https://image.tmdb.org/t/p/w500",
  endpoints: {
    genres: "https://api.themoviedb.org/3/genre/movie/list?",
    discover_movies: "https://api.themoviedb.org/3/discover/movie?"
  }
});

const api_key = api_config.key;
const img_url = api_config.image_base_url;
const genres_list_http = api_config.endpoints.genres;
const movie_genres_http = api_config.endpoints.discover_movies;

function buildApiUrl(baseUrl, params) {
  const search_params = new URLSearchParams({
    api_key: api_config.key,
    ...(params || {})
  });

  return `${baseUrl}${search_params}`;
}

async function requestJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function getRandomPage(maxPage = 3) {
  return Math.floor(Math.random() * maxPage) + 1;
}

async function fetchMovieGenres() {
  const url = buildApiUrl(api_config.endpoints.genres);
  const data = await requestJson(url);

  return Array.isArray(data.genres) ? data.genres : [];
}

async function fetchMoviesByGenre(genreId, page = getRandomPage()) {
  const url = buildApiUrl(api_config.endpoints.discover_movies, {
    with_genres: genreId,
    page
  });
  const data = await requestJson(url);

  return Array.isArray(data.results) ? data.results : [];
}

function getMovieImageUrl(path) {
  return path ? `${api_config.image_base_url}${path}` : "";
}
