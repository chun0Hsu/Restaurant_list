const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const methodOverride = require('method-override')

require('./config/mongoose')
const RestaurantList = require("./models/restaurantList");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get("/", (req, res) => {
  RestaurantList.find()
    .lean()
    .then((items) => res.render("index", { items }))
    .catch((err) => console.log(err));
});

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  RestaurantList.findById(id)
    .lean()
    .then((item) => res.render("show", { item }))
    .catch((err) => console.log(err));
});

app.post('/restaurants', (req, res) => {
  const addItem = req.body

  RestaurantList.create(addItem)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  RestaurantList.findById(id)
    .lean()
    .then(item => res.render('edit', { item }))
    .catch(err => console.log(err))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const modifyItem = req.body

  RestaurantList.findByIdAndUpdate(id, modifyItem)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  RestaurantList.findById(id)
    .then(item => item.deleteOne()) //mongoose@7.1.0 remove()棄用
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  RestaurantList.find({ $or: [{ name: keyword }, { category: keyword }] })
    .lean()
    .then(items => res.render('index', { items, keyword }))
    .catch(err => console.log(err))
});

app.listen(port, () => {
  console.log("running");
});
