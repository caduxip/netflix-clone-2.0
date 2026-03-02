const CATEGORY_SEPARATOR_PATTERN = /_/g
const CATEGORY_ID_SPACING_PATTERN = /\s+/g
const EMPTY_IMAGE_PATH = ""
const DEFAULT_MOVIE_TITLE = "Untitled"
const DEFAULT_MOVIE_POSTER_ALT = "movie poster"
const movieListClassName = "movie-list"
const movieCategoryClassName = "movie-category"
const movieContainerClassName = "movie-container"
const movieCardClassName = "movie"
const movieTitleClassName = "movie-title"
const navigationButtons = Object.freeze({
  previous: {
    className: "pre-btn",
    imagePath: "images/prev.png",
    altText: "previous button"
  },
  next: {
    className: "next-btn",
    imagePath: "images/next.png",
    altText: "next button"
  }
})

class MovieRenderer {
  constructor(apiService) {
    this.apiService = apiService
  }

  formatCategoryName(categoryName) {
    return categoryName.replace(CATEGORY_SEPARATOR_PATTERN, " ")
  }

  createCategoryId(categoryName) {
    return this.formatCategoryName(categoryName).trim().replace(CATEGORY_ID_SPACING_PATTERN, "_")
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

  resolveMovieImagePath(movie) {
    return movie.backdrop_path || movie.poster_path || EMPTY_IMAGE_PATH
  }

  createMovieCard(movie) {
    const imagePath = this.resolveMovieImagePath(movie)

    if (!imagePath) {
      return null
    }

    const movieCard = document.createElement("div")
    const poster = document.createElement("img")
    const title = document.createElement("p")

    movieCard.className = movieCardClassName
    poster.src = this.apiService.getMovieImageUrl(imagePath)
    poster.alt = movie.title || DEFAULT_MOVIE_POSTER_ALT
    title.className = movieTitleClassName
    title.textContent = movie.title || DEFAULT_MOVIE_TITLE

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

    movieList.className = movieListClassName
    title.className = movieCategoryClassName
    title.textContent = this.formatCategoryName(categoryName)
    movieContainer.className = movieContainerClassName
    movieContainer.id = this.createCategoryId(categoryName)

    movieList.append(
      this.createNavigationButton(
        navigationButtons.previous.className,
        navigationButtons.previous.imagePath,
        navigationButtons.previous.altText
      ),
      title,
      movieContainer,
      this.createNavigationButton(
        navigationButtons.next.className,
        navigationButtons.next.imagePath,
        navigationButtons.next.altText
      )
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

export { MovieRenderer }
