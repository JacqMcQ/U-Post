const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: "main", 
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
  });
});
