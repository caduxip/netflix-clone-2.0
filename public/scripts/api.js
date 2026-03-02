class MovieApi {
  constructor(config) {
    this.config = Object.freeze(config)
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

  async fetchMovieGenres() {
    const url = this.buildApiUrl(this.config.endpoints.genres)
    const data = await this.fetchJson(url)

    return Array.isArray(data.genres) ? data.genres : []
  }

  async fetchMoviesByGenre(genreId) {
    const url = this.buildApiUrl(this.config.endpoints.discoverMovies, {
      with_genres: genreId,
      page: Math.floor(Math.random() * 3) + 1
    })
    const data = await this.fetchJson(url)

    return Array.isArray(data.results) ? data.results : []
  }

  getMovieImageUrl(imagePath) {
    return imagePath ? `${this.config.imageBaseUrl}${imagePath}` : ""
  }
}

export { MovieApi }
