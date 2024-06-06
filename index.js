import express from 'express'
import playwright from 'playwright'

const app = express()
const targetPage = 'https://www.fatsecret.com.tr/kaloriler-beslenme/genel/elma?portionid=58449&portionamount=100,000'

async function test() {
  const browser = await playwright.chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(targetPage)

  let html = await page.content()
}

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Playwright Uygulaması</title>
      </head>
      <body>
        Hello world! <br />
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
  `)
})

app.post('/detail', (req, res) => {
  test()
  res.status(200).json({
    result: 'detail page dom'
  })
})

app.listen(3000)