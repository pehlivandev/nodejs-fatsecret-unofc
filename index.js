import express from 'express'
import playwright from 'playwright'
import jsdom from 'jsdom'

import home from './public/pages/home.js'

const app = express()

app.use(express.static('public'))

const targetPage = 'https://www.fatsecret.com.tr/kaloriler-beslenme/genel/elma?portionid=58449&portionamount=100,000'
const { JSDOM } = jsdom

async function handleHtml() {
  const browser = await playwright.chromium.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(targetPage)

  const html = await page.content()
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const nutritionItems = doc.querySelectorAll('.details > .factPanel > table:first-of-type .fact')

  const servingValue = doc.querySelector('.serving_size_value').textContent
  const nutritionValues = {
    calorie: '',
    fat: '',
    carbohydrate: '',
    protein: '',
  }

  nutritionItems.forEach((elem) => {
    const title = elem.querySelector('.factTitle').textContent
    const value = elem.querySelector('.factValue').textContent

    switch(title) {
      case 'Kal':
        nutritionValues['calorie'] = `${value} kcal`
        break
      case 'Yağ':
        nutritionValues['fat'] = value
        break
      case 'Karb':
        nutritionValues['carbohydrate'] = value
        break
      case 'Prot':
        nutritionValues['protein'] = value
        break
    }
  })

  await browser.close()

  return {
    servingValue,
    nutritionValues
  }
}

app.get('/', (req, res) => {
  res.send(home())
})

app.post('/detail', (req, res) => {
  handleHtml().then(
    response => {
      res.status(200).json({
        result: {
          ...response
        }
      })
    },
    error => {
      res.json({
        error
      })
    }
  )
})

app.listen(3000)