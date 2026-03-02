class MovieScroller {
  attachScrollButton(button, container, direction) {
    if (!button) {
      return
    }

    button.addEventListener("click", () => {
      const containerWidth = container.getBoundingClientRect().width

      container.scrollLeft += containerWidth * direction
    })
  }

  setup() {
    const containers = document.querySelectorAll(".movie-container")
    const nextButtons = document.querySelectorAll(".next-btn")
    const prevButtons = document.querySelectorAll(".pre-btn")

    containers.forEach((container, index) => {
      this.attachScrollButton(nextButtons[index], container, 1)
      this.attachScrollButton(prevButtons[index], container, -1)
    })
  }
}

export { MovieScroller }
