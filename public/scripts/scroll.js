function get_scroll_groups() {
  const containers = [...document.querySelectorAll(".movie-container")]
  const next_buttons = [...document.querySelectorAll(".next-btn")]
  const prev_buttons = [...document.querySelectorAll(".pre-btn")]

  return containers.map((container, index) => {
    return {
      container,
      next_button: next_buttons[index],
      prev_button: prev_buttons[index]
    }
  })
}

function bind_scroll_button(button, container, direction) {
  if (!button) {
    return
  }

  button.addEventListener("click", () => {
    const container_width = container.getBoundingClientRect().width

    container.scrollLeft += container_width * direction
  })
}

const setup_scrooling = () => {
  const scroll_groups = get_scroll_groups()

  scroll_groups.forEach(({ container, next_button, prev_button }) => {
    bind_scroll_button(next_button, container, 1)
    bind_scroll_button(prev_button, container, -1)
  })
}
