const mongoose = require('mongoose');
//Conexion a la base de datos
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://heroku_71bfjd7d:sl1cd5ceso86pl9dca9upuc904@ds311968.mlab.com:11968/heroku_71bfjd7d', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('(MongoDb) Conexion realizada'))
  .catch(err => console.error(err));
