const express = require('express');
const methodOverride= require("method-override");
const bodyParser = require('body-parser');

require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
