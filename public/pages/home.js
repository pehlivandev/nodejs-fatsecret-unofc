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
          <input type="search" id="search" placeholder="Type a food name">
          <button id="sendButton">Gönder</button>
        </div>
        <div class="search-result">Search result:</div>
        <script type="text/javascript" src="/assets/js/main.js"></script>
      </body>
    </html>
  `
}
