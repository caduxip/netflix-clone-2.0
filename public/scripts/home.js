const main_section = document.querySelector(".main")

initialize_home_page()

async function initialize_home_page() {
  try {
    const genres = await fetch_movie_genres()
    const categories = (await Promise.all(genres.map(load_category))).filter(Boolean)

    render_categories(main_section, categories)

    if (categories.length > 0) {
      setup_scrooling()
    }
  } catch (error) {
    console.error("Failed to load homepage data:", error)
  }
}

async function load_category({ id, name }) {
  try {
    const movies = await fetch_movies_by_genre(id)

    return {
      category_name: normalize_category_name(name),
      movies
    }
  } catch (error) {
    console.error(`Failed to load movies for genre "${name}":`, error)
    return null
  }
}
