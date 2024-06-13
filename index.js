import express from 'express'
import playwright from 'playwright'
import jsdom from 'jsdom'
import qs from 'qs'

import home from './public/pages/home.js'

const app = express()

app.use(express.json())
app.use(express.static('public'))

const { JSDOM } = jsdom

function generateParams(options) {
  const params = qs.stringify(options, {
    arrayFormat: "brackets",
    encode: false
  })

  return params
}

async function generateDom(url) {
  const browser = await playwright.chromium.launch({ headless: true })
  const contentOfPage = await browser.newPage()

  await contentOfPage.goto(url)

  const html = await contentOfPage.content()
  const dom = new JSDOM(html)
  const doc = dom.window.document

  return doc
}

async function handleListHtml(url) {
  const foodList = []
  const doc = await generateDom(url)
  const items = doc.querySelectorAll('table.generic.searchResult td.borderBottom')

  items.forEach((item) => {
    const prominent = item.querySelector('a.prominent')
    const title = prominent.textContent
    const link = prominent.getAttribute('href')

    foodList.push({ title, link })
  })

  return foodList
}

async function handleDetailHtml(url) {
  const doc = await generateDom(url)
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

app.post('/list', async (req, res) => {
  const page = 0
  const searchUrl = 'https://www.fatsecret.com.tr/kaloriler-beslenme/search'
  const url = `${searchUrl}?${generateParams({ q: req.body.search, pg: page })}`

  handleListHtml(url).then(
    response => {
      res.status(200).json({
        result: response
      })
    },
    error => {
      res.json({
        error
      })
    }
  )
})

app.post('/detail', (req, res) => {
  const url = 'https://www.fatsecret.com.tr/kaloriler-beslenme/genel/elma?portionid=58449&portionamount=100,000'
  
  handleDetailHtml(url).then(
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
