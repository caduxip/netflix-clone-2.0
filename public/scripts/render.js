class MovieRenderer {
  constructor(apiService) {
    this.apiService = apiService
  }

  formatCategoryName(categoryName) {
    return categoryName.replace(/_/g, " ")
  }

  createCategoryId(categoryName) {
    return this.formatCategoryName(categoryName).trim().replace(/\s+/g, "_")
  }

  createNavigationButton(buttonClass, imagePath, altText) {
    const button = document.createElement("button")
    const image = document.createElement("img")

    button.className = buttonClass
    image.src = imagePath
    image.alt = altText

    button.appendChild(image)

    return button
  }

  createMovieCard(movie) {
    const imagePath = movie.backdrop_path || movie.poster_path

    if (!imagePath) {
      return null
    }

    const movieCard = document.createElement("div")
    const poster = document.createElement("img")
    const title = document.createElement("p")

    movieCard.className = "movie"
    poster.src = this.apiService.getMovieImageUrl(imagePath)
    poster.alt = movie.title || "movie poster"
    title.className = "movie-title"
    title.textContent = movie.title || "Untitled"

    movieCard.append(poster, title)

    return movieCard
  }

  renderMovieCards(movieContainer, movies) {
    const fragment = document.createDocumentFragment()

    movies.forEach((movie) => {
      const movieCard = this.createMovieCard(movie)

      if (!movieCard) {
        return
      }

      fragment.appendChild(movieCard)
    })

    movieContainer.appendChild(fragment)
  }

  renderCategory(mainSection, categoryName, movies) {
    const movieList = document.createElement("div")
    const title = document.createElement("h1")
    const movieContainer = document.createElement("div")

    movieList.className = "movie-list"
    title.className = "movie-category"
    title.textContent = this.formatCategoryName(categoryName)
    movieContainer.className = "movie-container"
    movieContainer.id = this.createCategoryId(categoryName)

    movieList.append(
      this.createNavigationButton("pre-btn", "images/prev.png", "previous button"),
      title,
      movieContainer,
      this.createNavigationButton("next-btn", "images/next.png", "next button")
    )

    mainSection.appendChild(movieList)
    this.renderMovieCards(movieContainer, movies)
  }

  renderCategories(mainSection, categories) {
    categories.forEach(({ categoryName, movies }) => {
      this.renderCategory(mainSection, categoryName, movies)
    })
  }
}

const movieRenderer = new MovieRenderer(movieApi)
