const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get("/:id", (req, res) => {
  const id = req.params.id;
  RestaurantList.findById(id)
    .lean()
    .then((item) => res.render("show", { item }))
    .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
  const addItem = req.body

  RestaurantList.create(addItem)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  RestaurantList.findById(id)
    .lean()
    .then(item => res.render('edit', { item }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const modifyItem = req.body

  RestaurantList.findByIdAndUpdate(id, modifyItem)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  RestaurantList.findById(id)
    .then(item => item.deleteOne()) //mongoose@7.1.0 remove()棄用
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router