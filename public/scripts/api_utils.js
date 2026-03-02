function build_api_url(base_url, params) {
  const search_params = new URLSearchParams({
    api_key: api_config.key,
    ...(params || {})
  })

  return `${base_url}${search_params}`
}

async function request_json(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

function get_random_page(max_page = 3) {
  return Math.floor(Math.random() * max_page) + 1
}
