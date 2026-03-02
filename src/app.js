import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import register_home_route from "./routes/home_route.js"

const public_directory_path = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public")

function create_app() {
  const app = express()

  app.use(express.static(public_directory_path))
  register_home_route(app)

  return app
}

export default create_app
