const apiConfig = Object.freeze({
  apiKey: "d19a1946970f98fae002af7545322879",
  imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  endpoints: {
    genres: "https://api.themoviedb.org/3/genre/movie/list?",
    discoverMovies: "https://api.themoviedb.org/3/discover/movie?"
  }
})

const maxDiscoveryPage = 3

function buildApiUrl(baseUrl, params = {}) {
  return `${baseUrl}${new URLSearchParams({
    api_key: apiConfig.apiKey,
    ...params
  })}`
}

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

function pickRandomPage(maxPage = maxDiscoveryPage) {
  return Math.floor(Math.random() * maxPage) + 1
}

async function fetchMovieGenres() {
  const url = buildApiUrl(apiConfig.endpoints.genres)
  const data = await fetchJson(url)

  return Array.isArray(data.genres) ? data.genres : []
}

async function fetchMoviesByGenre(genreId) {
  const url = buildApiUrl(apiConfig.endpoints.discoverMovies, {
    with_genres: genreId,
    page: pickRandomPage()
  })
  const data = await fetchJson(url)

  return Array.isArray(data.results) ? data.results : []
}

function getMovieImageUrl(imagePath) {
  return imagePath ? `${apiConfig.imageBaseUrl}${imagePath}` : ""
}
