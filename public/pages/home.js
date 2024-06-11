export default function() {
  let foodList = []
  function getFoods() {
    return `
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
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
    `
  }

  function getFoodDetail() {
    return `
      fetch('/detail', { method: 'POST' }).then(
        response => {
          console.log('RESPONSE: ', response)
          return response
        },
        error => {
          console.log('ERROR: ', error)
          return error
        }
      )
    `
  }

  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Playwright Uygulaması</title>
        <link rel="stylesheet" href="/assets/style.css">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wdth,wght@87.5,100..900&display=swap" rel="stylesheet">
      </head>
      <body>
        Hello world! <br />
        <div class="search">
          <input type="search" placeholder="Type a food name" oninput="processChanges(event)">
          <button id="sendButton">Gönder</button>
        </div>
        <div class="search-result">Search result: <pre>${foodList}</pre></div>
        <script type="text/javascript">
          const button = document.getElementById('sendButton')
          button.addEventListener('click', function() {
            ${getFoodDetail()}
          })

          function debounce(func, timeout = 300) {
            let timer;
            return (...args) => {
              clearTimeout(timer);
              timer = setTimeout(() => { func.apply(this, args) }, timeout)
            }
          }

          const processChanges = debounce((event) => ${getFoods()}, 1000);
        </script>
      </body>
    </html>
  `
}
