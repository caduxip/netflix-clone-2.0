import { indexFilePath } from "../config/paths.js"

class HomeRoute {
  register(app) {
    app.get("/", (_request, response) => {
      response.sendFile(indexFilePath)
    })
  }
}

export default HomeRoute
