export default function() {
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
          <input type="search" placeholder="Type a food name">
        </div>
        <button id="sendButton">Gönder</button>
        <script type="text/javascript">
          const button = document.getElementById('sendButton')
          button.addEventListener('click', function() {
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
          })
        </script>
      </body>
    </html>
  `
}
