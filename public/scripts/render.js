function normalize_category_name(category_name) {
  return category_name.replace(/_/g, " ")
}

function create_category_id(category_name) {
  return category_name.trim().replace(/\s+/g, "_")
}

function create_navigation_button(button_class, image_path, alt_text) {
  const button = document.createElement("button")
  const image = document.createElement("img")

  button.className = button_class
  image.src = image_path
  image.alt = alt_text

  button.appendChild(image)

  return button
}

function create_movie_card(movie) {
  const backdrop_path = movie.backdrop_path || movie.poster_path

  if (!backdrop_path) {
    return null
  }

  const movie_card = document.createElement("div")
  const poster = document.createElement("img")
  const title = document.createElement("p")

  movie_card.className = "movie"
  poster.src = get_movie_image_url(backdrop_path)
  poster.alt = movie.title || "movie poster"
  title.className = "movie-title"
  title.textContent = movie.title || "Untitled"

  movie_card.append(poster, title)

  return movie_card
}

function render_movie_cards(movie_container, movies) {
  const fragment = document.createDocumentFragment()

  movies.forEach((movie) => {
    const movie_card = create_movie_card(movie)

    if (!movie_card) {
      return
    }

    fragment.appendChild(movie_card)
  })

  movie_container.appendChild(fragment)
}

function render_category(main_section, category_name, movies) {
  const movie_list = document.createElement("div")
  const title = document.createElement("h1")
  const movie_container = document.createElement("div")

  movie_list.className = "movie-list"
  title.className = "movie-category"
  title.textContent = normalize_category_name(category_name)
  movie_container.className = "movie-container"
  movie_container.id = create_category_id(category_name)

  movie_list.append(
    create_navigation_button("pre-btn", "images/prev.png", "previous button"),
    title,
    movie_container,
    create_navigation_button("next-btn", "images/next.png", "next button")
  )

  main_section.appendChild(movie_list)
  render_movie_cards(movie_container, movies)
}

function render_categories(main_section, categories) {
  categories.forEach(({ category_name, movies }) => render_category(main_section, category_name, movies))
}
