const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

router.get("/", (req, res) => {
  const sortCondition = req.query.sortWay
  const sortConditionObject = {}
  const selectedObject = {
    sort: false,
    aToz: false,
    zToa: false,
    category: false,
    location: false
  }

  if (sortCondition === 'asc') {
    sortConditionObject.name = 'asc'
    selectedObject.aToz = true
  }
  else if (sortCondition === 'desc') {
    sortConditionObject.name = 'desc'
    selectedObject.zToa = true
  }
  else if (sortCondition === 'category') {
    sortConditionObject.category = 'asc'
    selectedObject.category = true
  }
  else if (sortCondition === 'location') {
    sortConditionObject.location = 'asc'
    selectedObject.location = true
  }
  else if (!sortCondition) {
    selectedObject.sort = true
  }

  RestaurantList.find()
    .lean()
    .sort(sortConditionObject)
    .then((items) => res.render("index", { items, selectedObject }))
    .catch((err) => console.log(err));
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  RestaurantList.find({
    $or: [
      {
        $expr: {
          $eq: [{ $toLower: "$name" }, keyword]
        }
      },
      {
        $expr: {
          $eq: [{ $toLower: "$category" }, keyword]
        }
      }
    ]
  })
    .lean()
    .sort({ name: 'asc' })
    .then(items => res.render('index', { items, keyword }))
    .catch(err => console.log(err))
});

module.exports = router