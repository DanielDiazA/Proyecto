const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//Inizializaciones
const app = express();
require("./database");
require("./config/passport");

//Configuración
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views")); //Concatenar con fichero del Frontal
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main", //Diseño Principal
    layoutsDir: path.join(app.get("views"), "layouts"), // concatenar fichero layouts
    partialsDir: path.join(app.get("views"), "partials"), // concatenar fichero partials
    extname: ".hbs" //formato de archivo que se utiliza (hbs en vez de html)
  })
);
//Motor de plantillas handlebars
app.set("view engine", ".hbs");

//Funciones Middlewares
app.use(express.urlencoded({ extended: false })); //solo recibir datos , no imágenes
app.use(methodOverride("_method")); //Poder utilizar metodo como put y delete , no solo get y post
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
//tener sesion para cada usuario
app.use(passport.initialize());
app.use(passport.session());
//Flash
app.use(flash());

//Variables Globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next(); //evitar que se quede colgada la página
});

//Routes
app.use(require("./routes"));
app.use(require("./routes/users"));
app.use(require("./routes/dogs"));

//Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Server a la escucha
app.listen(app.get("port"), () => {
  console.log("(Server) Escuchando el puerto)", app.get("port"));
});
