const express = require("express");
const exphbs = require("express-handlebars");
var hbsHelpers = require('handlebars-helpers');
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');

var MongoStore = require('connect-mongo')(session);

//Inizializaciones
const app = express();

require("./config/passport");

//Conexion a la base de datos
mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    "mongodb://heroku_71bfjd7d:sl1cd5ceso86pl9dca9upuc904@ds311968.mlab.com:11968/heroku_71bfjd7d",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(db => console.log("(MongoDb) Conexion realizada"))
  .catch(err => console.error(err));

//Configuración
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views")); //Concatenar con fichero del Frontal
app.engine(".hbs", exphbs({
  helpers: {
    
    operaciones:  function (v1, operator, v2, options) { ///Todos los operadores lógicos
      switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);}
    },
      comp: function(operand_1, operator, operand_2, options){
        var operators = {
          'eq': function(l,r) { return l == r; },
          'noteq': function(l,r) { return l != r; },
          'gt': function(l,r) { return Number(l) > Number(r); },
          'or': function(l,r) { return l || r; },
          'and': function(l,r) { return l && r; },
          '%': function(l,r) { return (l % r) === 0; }
         }
         , result = operators[operator](operand_1,operand_2);
       
         if (result) return options.fn(this);
         else  return options.inverse(this);
      },

    
    },
    defaultLayout: "main", //Diseño Principal
    layoutsDir: path.join(app.get("views"), "layouts"), // concatenar fichero layouts
    partialsDir: path.join(app.get("views"), "partials"), // concatenar fichero partials
    extname: ".hbs" //formato de archivo que se utiliza (hbs en vez de html)
  })
);
app.set("view engine", ".hbs");//Motor de plantillas handlebars









//Funciones Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method")); //Poder utilizar metodo como put y delete , no solo get y post
app.use(validator());
app.use(
  session({
    secret: "secret",
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),//carrito de compra
    saveUninitialized: false,
    cookie: {maxAge: 180* 60 * 1000}//duracion de las sesion en miliseggundos
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
  res.locals.session = req.session;
  res.locals.user = req.user || null;
  next(); //evitar que se quede colgada la página
});

//Routes
app.use(require("./routes"));
app.use(require("./routes/users"));
app.use(require("./routes/dogs"));
app.use(require("./routes/admin"));

//Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Server a la escucha
app.listen(app.get("port"), () => {
  console.log("(Server) Escuchando el puerto)", app.get("port"));
});
