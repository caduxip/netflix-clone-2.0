import path from "path"
import { fileURLToPath } from "url"

class HomeRoute {
  constructor() {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDirectory = path.dirname(currentFilePath)
    const publicDirectoryPath = path.join(currentDirectory, "..", "..", "public")

    this.indexFilePath = path.join(publicDirectoryPath, "index.html")
  }

  register(app) {
    app.get("/", (_request, response) => {
      response.sendFile(this.indexFilePath)
    })
  }
}

export default HomeRoute
