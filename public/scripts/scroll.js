const NEXT_PAGE_DIRECTION = 1
const PREVIOUS_PAGE_DIRECTION = -1

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
      this.attachScrollButton(nextButtons[index], container, NEXT_PAGE_DIRECTION)
      this.attachScrollButton(prevButtons[index], container, PREVIOUS_PAGE_DIRECTION)
    })
  }
}

export { MovieScroller }
