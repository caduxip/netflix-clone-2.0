function create_element(tag_name, class_name, text_content) {
  const element = document.createElement(tag_name)

  if (class_name) {
    element.className = class_name
  }

  if (typeof text_content === "string") {
    element.textContent = text_content
  }

  return element
}

function create_image_element(source, alt_text) {
  const image = create_element("img")
  image.src = source
  image.alt = alt_text

  return image
}

function append_children(parent, children) {
  children.forEach((child) => {
    parent.appendChild(child)
  })

  return parent
}
