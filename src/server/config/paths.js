import path from "path"
import { fileURLToPath } from "url"

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirectory = path.dirname(currentFilePath)
const projectRoot = path.join(currentDirectory, "..", "..", "..")
const publicDirectoryPath = path.join(projectRoot, "public")
const indexFilePath = path.join(publicDirectoryPath, "index.html")

export { indexFilePath, publicDirectoryPath }
