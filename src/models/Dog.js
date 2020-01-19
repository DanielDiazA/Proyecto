const mongoose = require("mongoose");
const { Schema } = mongoose;
//Modelo de datos del Perfil del Perro
const DogSchema = new Schema({
  nombreperro: {
    type: String,
    required: true
  },
  raza: {
    type: String,
    required: true
  },
  edadperro: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  tlfd: {
    type: Number,
    required: true
  },
  tlfc: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Dog", DogSchema);
