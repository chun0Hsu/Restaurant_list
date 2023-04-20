const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { items: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.id)

  res.render('show', { item: restaurant })
})

app.get('/search', (req, res) => {
  const queryItems = restaurantList.results.filter(item => req.query.keyword === item.name || req.query.keyword === item.category)

  res.render('index', { items: queryItems, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log('running')
})