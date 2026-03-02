const api_config = Object.freeze({
  key: "d19a1946970f98fae002af7545322879",
  image_base_url: "https://image.tmdb.org/t/p/w500",
  endpoints: {
    genres: "https://api.themoviedb.org/3/genre/movie/list?",
    discover_movies: "https://api.themoviedb.org/3/discover/movie?"
  }
})

function build_api_url(base_url, params = {}) {
  return `${base_url}${new URLSearchParams({
    api_key: api_config.key,
    ...params
  })}`
}

async function request_json(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

async function fetch_movie_genres() {
  const data = await request_json(build_api_url(api_config.endpoints.genres))

  return Array.isArray(data.genres) ? data.genres : []
}

async function fetch_movies_by_genre(genre_id) {
  const data = await request_json(build_api_url(api_config.endpoints.discover_movies, {
    with_genres: genre_id,
    page: Math.floor(Math.random() * 3) + 1
  }))

  return Array.isArray(data.results) ? data.results : []
}

function get_movie_image_url(path) {
  return path ? `${api_config.image_base_url}${path}` : ""
}
