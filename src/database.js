const mongoose = require('mongoose');
//Conexion a la base de datos
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/dog', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('(MongoDb) Conexion realizada'))
  .catch(err => console.error(err));
