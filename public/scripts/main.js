import { MovieApi } from "./api.js"
import { HomePage } from "./home.js"
import { MovieRenderer } from "./render.js"
import { MovieScroller } from "./scroll.js"

const movieApi = new MovieApi({
  apiKey: "d19a1946970f98fae002af7545322879",
  imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  endpoints: {
    genres: "https://api.themoviedb.org/3/genre/movie/list?",
    discoverMovies: "https://api.themoviedb.org/3/discover/movie?"
  }
})

const movieRenderer = new MovieRenderer(movieApi)
const movieScroller = new MovieScroller()
const homePage = new HomePage(
  document.querySelector(".main"),
  movieApi,
  movieRenderer,
  movieScroller
)

homePage.initialize()
