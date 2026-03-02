function setup_scrooling() {
  const containers = document.querySelectorAll(".movie-container")
  const next_buttons = document.querySelectorAll(".next-btn")
  const prev_buttons = document.querySelectorAll(".pre-btn")

  containers.forEach((container, index) => {
    next_buttons[index]?.addEventListener("click", () => {
      container.scrollLeft += container.getBoundingClientRect().width
    })

    prev_buttons[index]?.addEventListener("click", () => {
      container.scrollLeft -= container.getBoundingClientRect().width
    })
  })
}
