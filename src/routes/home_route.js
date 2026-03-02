import path from "path"
import { fileURLToPath } from "url"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(currentFilePath)
const publicDirectoryPath = path.join(currentDirectory, "..", "..", "public")
const indexFilePath = path.join(publicDirectoryPath, "index.html")

function register_home_route(app) {
  app.get("/", (_request, response) => {
    response.sendFile(indexFilePath)
  })
}

export default register_home_route
