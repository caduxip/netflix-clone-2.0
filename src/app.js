const express = require("express");
const path = require("path");

const public_directory_path = path.join(__dirname, "..", "public");
const index_file_path = path.join(public_directory_path, "index.html");

function configure_static_files(app) {
  app.use(express.static(public_directory_path));
}

function configure_routes(app) {
  app.get("/", (_request, response) => {
    response.sendFile(index_file_path);
  });
}

function create_app() {
  const app = express();

  configure_static_files(app);
  configure_routes(app);

  return app;
}

module.exports = create_app;
