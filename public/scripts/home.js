const mainSection = document.querySelector(".main")

initializeHomePage()

async function initializeHomePage() {
  if (!mainSection) {
    return
  }

  try {
    const genres = await fetchMovieGenres()
    const categories = await loadCategories(genres)

    renderCategories(mainSection, categories)

    if (categories.length > 0) {
      setupScrolling()
    }
  } catch (error) {
    console.error("Failed to load homepage data:", error)
  }
}

async function loadCategories(genres) {
  const categories = await Promise.all(genres.map(loadCategory))

  return categories.filter(Boolean)
}

async function loadCategory(genre) {
  const { id, name } = genre

  try {
    const movies = await fetchMoviesByGenre(id)

    return {
      categoryName: formatCategoryName(name),
      movies
    }
  } catch (error) {
    console.error(`Failed to load movies for genre "${name}":`, error)
    return null
  }
}
