let foodList = []
const button = document.getElementById('sendButton')
const search = document.getElementById('search')
const resultArea = document.querySelector('.search-result')

function getFoods(event) {
  console.log('ARG: ', event)

  fetch('/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search: event.target.value })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Resp: ', data.result)
    foodList = data.result

    resultArea.innerHTML = ''

    foodList.forEach(food => {
      const foodWrapper = document.createElement('div')
      const foodLink = document.createElement('a')
      foodLink.textContent = food.title
      foodLink.href = food.link
      foodLink.onclick = function(event) {
        event.preventDefault()
        getFoodDetail(food.link)
      }
      foodWrapper.appendChild(foodLink)
      resultArea.appendChild(foodWrapper)
    })
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}

function getFoodDetail(link) {
  console.log('LINK: ', link)

  fetch('/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ link })
  })
  .then(response => response.json())
  .then(data => {
    console.log('DETAIL RESPONSE: ', data)

    resultArea.innerHTML = ''

    const detailHtml = `
      <div>deneme 1, 2</div>
    `

    resultArea.innerHTML = detailHtml

    return data
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

const debouncedGetFoods = debounce((event) => getFoods(event), 1000);

button.onclick = () => {
  getFoodDetail()
}

search.oninput = (event) => {
  debouncedGetFoods(event);
}
