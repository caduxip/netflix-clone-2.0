const api_config = Object.freeze({
  key: "d19a1946970f98fae002af7545322879",
  image_base_url: "https://image.tmdb.org/t/p/w500",
  endpoints: {
    genres: "https://api.themoviedb.org/3/genre/movie/list?",
    discover_movies: "https://api.themoviedb.org/3/discover/movie?"
  }
})

async function fetch_movie_genres() {
  const url = build_api_url(api_config.endpoints.genres)
  const data = await request_json(url)

  return Array.isArray(data.genres) ? data.genres : []
}

async function fetch_movies_by_genre(genre_id, page = get_random_page()) {
  const url = build_api_url(api_config.endpoints.discover_movies, {
    with_genres: genre_id,
    page
  })
  const data = await request_json(url)

  return Array.isArray(data.results) ? data.results : []
}

function get_movie_image_url(path) {
  return path ? `${api_config.image_base_url}${path}` : ""
}
