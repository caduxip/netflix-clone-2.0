import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import register_home_route from "./routes/home_route.js"

const current_file_path = fileURLToPath(import.meta.url)
const current_directory_path = path.dirname(current_file_path)
const public_directory_path = path.join(current_directory_path, "..", "public")

function configure_static_files(app) {
  app.use(express.static(public_directory_path))
}

function configure_routes(app) {
  register_home_route(app)
}

function create_app() {
  const app = express()

  configure_static_files(app)
  configure_routes(app)

  return app
}

export default create_app
