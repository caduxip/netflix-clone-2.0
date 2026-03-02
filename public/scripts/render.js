function formatCategoryName(categoryName) {
  return categoryName.replace(/_/g, " ")
}

function createCategoryId(categoryName) {
  return formatCategoryName(categoryName).trim().replace(/\s+/g, "_")
}

function createNavigationButton(buttonClass, imagePath, altText) {
  const button = document.createElement("button")
  const image = document.createElement("img")

  button.className = buttonClass
  image.src = imagePath
  image.alt = altText

  button.appendChild(image)

  return button
}

function createMovieCard(movie) {
  const imagePath = movie.backdrop_path || movie.poster_path

  if (!imagePath) {
    return null
  }

  const movie_card = document.createElement("div")
  const poster = document.createElement("img")
  const title = document.createElement("p")

  movie_card.className = "movie"
  poster.src = getMovieImageUrl(imagePath)
  poster.alt = movie.title || "movie poster"
  title.className = "movie-title"
  title.textContent = movie.title || "Untitled"

  movie_card.append(poster, title)

  return movie_card
}

function renderMovieCards(movieContainer, movies) {
  const fragment = document.createDocumentFragment()

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie)

    if (!movieCard) {
      return
    }

    fragment.appendChild(movieCard)
  })

  movieContainer.appendChild(fragment)
}

function createCategorySection(categoryName) {
  const movieList = document.createElement("div")
  const title = document.createElement("h1")
  const movieContainer = document.createElement("div")

  movieList.className = "movie-list"
  title.className = "movie-category"
  title.textContent = formatCategoryName(categoryName)
  movieContainer.className = "movie-container"
  movieContainer.id = createCategoryId(categoryName)

  movieList.append(
    createNavigationButton("pre-btn", "images/prev.png", "previous button"),
    title,
    movieContainer,
    createNavigationButton("next-btn", "images/next.png", "next button")
  )

  return {
    movieList,
    movieContainer
  }
}

function renderCategory(mainSection, categoryName, movies) {
  const { movieList, movieContainer } = createCategorySection(categoryName)

  mainSection.appendChild(movieList)
  renderMovieCards(movieContainer, movies)
}

function renderCategories(mainSection, categories) {
  categories.forEach(({ categoryName, movies }) => {
    renderCategory(mainSection, categoryName, movies)
  })
}
