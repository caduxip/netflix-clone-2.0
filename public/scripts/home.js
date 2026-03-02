class HomePage {
  constructor(mainSection, apiService, renderer, scroller) {
    this.mainSection = mainSection
    this.apiService = apiService
    this.renderer = renderer
    this.scroller = scroller
  }

  async initialize() {
    if (!this.mainSection) {
      return
    }

    try {
      const categories = await this.loadCategories()

      this.renderer.renderCategories(this.mainSection, categories)

      if (categories.length > 0) {
        this.scroller.setup()
      }
    } catch (error) {
      console.error("Failed to load homepage data:", error)
    }
  }

  async loadCategories() {
    const genres = await this.apiService.fetchMovieGenres()
    const categories = await Promise.all(genres.map((genre) => this.loadCategory(genre)))

    return categories.filter(Boolean)
  }

  async loadCategory(genre) {
    const { id, name } = genre

    try {
      const movies = await this.apiService.fetchMoviesByGenre(id)

      return {
        categoryName: this.renderer.formatCategoryName(name),
        movies
      }
    } catch (error) {
      console.error(`Failed to load movies for genre "${name}":`, error)
      return null
    }
  }
}

export { HomePage }
