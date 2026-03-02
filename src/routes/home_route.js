const path = require("path")

const public_directory_path = path.join(__dirname, "..", "..", "public")
const index_file_path = path.join(public_directory_path, "index.html")

function register_home_route(app) {
  app.get("/", (_request, response) => {
    response.sendFile(index_file_path)
  })
}

module.exports = register_home_route
