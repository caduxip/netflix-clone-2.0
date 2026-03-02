function scrollContainerByPage(container, direction) {
  const containerWidth = container.getBoundingClientRect().width

  container.scrollLeft += containerWidth * direction
}

function attachScrollButton(button, container, direction) {
  if (!button) {
    return
  }

  button.addEventListener("click", () => {
    scrollContainerByPage(container, direction)
  })
}

function setupScrolling() {
  const containers = document.querySelectorAll(".movie-container")
  const nextButtons = document.querySelectorAll(".next-btn")
  const prevButtons = document.querySelectorAll(".pre-btn")

  containers.forEach((container, index) => {
    attachScrollButton(nextButtons[index], container, 1)
    attachScrollButton(prevButtons[index], container, -1)
  })
}
