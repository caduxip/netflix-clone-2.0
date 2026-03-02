const main_section = document.querySelector(".main");

initializeHomePage();

async function initializeHomePage() {
  try {
    const genres = await fetchMovieGenres();
    const category_requests = genres.map(({ id, name }) => loadCategory(id, name));
    const categories = await Promise.all(category_requests);
    const valid_categories = categories.filter(Boolean);

    valid_categories.forEach(({ categoryName, movies }) => {
        renderCategory(categoryName, movies);
      });

    if (valid_categories.length > 0) {
      setup_scrooling();
    }
  } catch (error) {
    console.error("Failed to load homepage data:", error);
  }
}

async function loadCategory(id, name) {
  try {
    const movies = await fetchMoviesByGenre(id);
    return {
      categoryName: name.replace(/_/g, " "),
      movies
    };
  } catch (error) {
    console.error(`Failed to load movies for genre "${name}":`, error);
    return null;
  }
}

function renderCategory(categoryName, movies) {
  const movie_list = document.createElement("div");
  movie_list.className = "movie-list";

  const previous_button = createNavButton("pre-btn", "images/prev.png", "previous button");
  const title = document.createElement("h1");
  title.className = "movie-category";
  title.textContent = categoryName;

  const movie_container = document.createElement("div");
  movie_container.className = "movie-container";
  movie_container.id = createCategoryId(categoryName);

  const next_button = createNavButton("next-btn", "images/next.png", "next button");

  movie_list.append(previous_button, title, movie_container, next_button);
  main_section.appendChild(movie_list);

  renderMovieCards(movie_container, movies);
}

function createNavButton(buttonClass, imagePath, altText) {
  const button = document.createElement("button");
  button.className = buttonClass;

  const image = document.createElement("img");
  image.src = imagePath;
  image.alt = altText;

  button.appendChild(image);

  return button;
}

function renderMovieCards(movieContainer, movies) {
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const backdrop_path = movie.backdrop_path || movie.poster_path;

    if (!backdrop_path) {
      return;
    }

    const movie_card = document.createElement("div");
    movie_card.className = "movie";

    const poster = document.createElement("img");
    poster.src = getMovieImageUrl(backdrop_path);
    poster.alt = movie.title || "movie poster";

    const title = document.createElement("p");
    title.className = "movie-title";
    title.textContent = movie.title || "Untitled";

    movie_card.append(poster, title);
    fragment.appendChild(movie_card);
  });

  movieContainer.appendChild(fragment);
}

function createCategoryId(categoryName) {
  return categoryName.trim().replace(/\s+/g, "_");
}
