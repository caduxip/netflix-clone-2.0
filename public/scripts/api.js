class MovieApi {
  constructor(config) {
    this.config = Object.freeze(config)
    this.maxDiscoveryPage = 3
  }

  buildApiUrl(baseUrl, params = {}) {
    return `${baseUrl}${new URLSearchParams({
      api_key: this.config.apiKey,
      ...params
    })}`
  }

  async fetchJson(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json()
  }

  pickRandomPage(maxPage = this.maxDiscoveryPage) {
    return Math.floor(Math.random() * maxPage) + 1
  }

  async fetchMovieGenres() {
    const url = this.buildApiUrl(this.config.endpoints.genres)
    const data = await this.fetchJson(url)

    return Array.isArray(data.genres) ? data.genres : []
  }

  async fetchMoviesByGenre(genreId) {
    const url = this.buildApiUrl(this.config.endpoints.discoverMovies, {
      with_genres: genreId,
      page: this.pickRandomPage()
    })
    const data = await this.fetchJson(url)

    return Array.isArray(data.results) ? data.results : []
  }

  getMovieImageUrl(imagePath) {
    return imagePath ? `${this.config.imageBaseUrl}${imagePath}` : ""
  }
}

const movieApi = new MovieApi({
  apiKey: "d19a1946970f98fae002af7545322879",
  imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  endpoints: {
    genres: "https://api.themoviedb.org/3/genre/movie/list?",
    discoverMovies: "https://api.themoviedb.org/3/discover/movie?"
  }
})
