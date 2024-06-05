import express from 'express'

const app = express()

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
        Hello world!
      </body>
    </html>
  `)
})

app.listen(3000)