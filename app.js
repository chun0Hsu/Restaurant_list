const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require('./routes/index')

const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log("running");
});
