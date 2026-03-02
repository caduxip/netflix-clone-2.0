import path from "path"
import { fileURLToPath } from "url"

const current_file_path = fileURLToPath(import.meta.url)
const current_directory_path = path.dirname(current_file_path)
const public_directory_path = path.join(current_directory_path, "..", "..", "public")
const index_file_path = path.join(public_directory_path, "index.html")

function register_home_route(app) {
  app.get("/", (_request, response) => {
    response.sendFile(index_file_path)
  })
}

export default register_home_route
