import path from "path"
import { fileURLToPath } from "url"

const public_directory_path = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "public")
const index_file_path = path.join(public_directory_path, "index.html")

function register_home_route(app) {
  app.get("/", (_request, response) => {
    response.sendFile(index_file_path)
  })
}

export default register_home_route
