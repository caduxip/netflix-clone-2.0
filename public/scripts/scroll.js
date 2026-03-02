const setup_scrooling = () => {
  const container = [...document.querySelectorAll(".movie-container")]

  const next_btn = [...document.querySelectorAll(".next-btn")]
  const prev_btn = [...document.querySelectorAll(".pre-btn")]


  container.forEach((item, i)=>{
    let container_dimensions = item.getBoundingClientRect()
    let container_width = container_dimensions.width

    next_btn[i].addEventListener('click', ()=>{
      item.scrollLeft += container_width
    })

    prev_btn[i].addEventListener('click', ()=>{
      item.scrollLeft -= container_width
    })

  })
}
