const express = require("express");
const db = require("./models");
const session = require("express-session");
const passport = require("passport");

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes)


db.sequelize.sync({force:true}).then(() => {
    app.listen(PORT, () => {
        console.log(`app listening on: http://localhost:${PORT}`);

    })
})