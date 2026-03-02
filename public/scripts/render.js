function normalize_category_name(category_name) {
  return category_name.replace(/_/g, " ")
}

function create_category_id(category_name) {
  return normalize_category_name(category_name).trim().replace(/\s+/g, "_")
}

function create_navigation_button(button_class, image_path, alt_text) {
  const button = create_element("button", button_class)
  const image = create_image_element(image_path, alt_text)

  button.appendChild(image)

  return button
}

function create_movie_card(movie) {
  const backdrop_path = movie.backdrop_path || movie.poster_path

  if (!backdrop_path) {
    return null
  }

  const movie_card = create_element("div", "movie")

  const poster = create_image_element(get_movie_image_url(backdrop_path), movie.title || "movie poster")

  const title = create_element("p", "movie-title", movie.title || "Untitled")

  append_children(movie_card, [poster, title])

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

function create_category_section(category_name) {
  const movie_list = create_element("div", "movie-list")

  const previous_button = create_navigation_button("pre-btn", "images/prev.png", "previous button")

  const title = create_element("h1", "movie-category", normalize_category_name(category_name))

  const movie_container = create_element("div", "movie-container")
  movie_container.id = create_category_id(category_name)

  const next_button = create_navigation_button("next-btn", "images/next.png", "next button")

  append_children(movie_list, [previous_button, title, movie_container, next_button])

  return {
    movie_list,
    movie_container
  }
}

function render_category(main_section, category_name, movies) {
  const category_section = create_category_section(category_name)

  main_section.appendChild(category_section.movie_list)
  render_movie_cards(category_section.movie_container, movies)
}

function render_categories(main_section, categories) {
  categories.forEach(({ category_name, movies }) => {
    render_category(main_section, category_name, movies)
  })
}
