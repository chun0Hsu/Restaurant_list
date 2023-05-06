const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

router.get("/", (req, res) => {
  RestaurantList.find()
    .lean()
    .then((items) => res.render("index", { items }))
    .catch((err) => console.log(err));
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword
  RestaurantList.find({ $or: [{ name: keyword }, { category: keyword }] })
    .lean()
    .then(items => res.render('index', { items, keyword }))
    .catch(err => console.log(err))
});

module.exports = router