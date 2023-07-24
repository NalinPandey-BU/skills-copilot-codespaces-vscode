// create a web server
// 1. import express
const express = require('express')
// 2. create an express application
const app = express()
// 3. create a port variable
const port = 3000
// 4. import express-handlebars
const exphbs = require('express-handlebars')
// 5. import restaurantList.json
const restaurantList = require('./restaurant.json')
// 6. setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 7. setting static files
app.use(express.static('public'))
// 8. import body-parser
const bodyParser = require('body-parser')
// 9. setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// 10. setting routes
// index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
// show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})
// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
// 11. setting listen
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})