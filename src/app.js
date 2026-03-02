const express = require("express")
const path = require("path")
const register_home_route = require("./routes/home_route")

const public_directory_path = path.join(__dirname, "..", "public")

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

module.exports = create_app
