var express = require('express');
var router = express.Router();
var Product = require('./models/product');
var mongoose = require('mongoose');

//seeding data
mongoose
    .connect(
        "mongodb://heroku_71bfjd7d:sl1cd5ceso86pl9dca9upuc904@ds311968.mlab.com:11968/heroku_71bfjd7d", {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(db => console.log("(MongoDb) Productos guardados"))
    .catch(err => console.error(err));

var products = [

    new Product({
        imagePath: 'https://gdurl.com/zGsm',
        title: 'Arnés Naranja NLD',
        description: 'Arnés para perros ergonómico diseñado con el modelo NLD. Tallas de código QR M y S. Color Naranja.',
        price: 19.50,
        cantidad: 2
    }),

    new Product({
        imagePath: 'https://gdurl.com/bRXA',
        title: 'Arnés Azul NLD',
        description: 'Arnés para perros ergonómico diseñado con el modelo NLD. Tallas de código QR S, M y L. Color Azul.',
        price: 19.50,
        cantidad: 30
    }),

    new Product({
        imagePath: 'https://gdurl.com/9wvo',
        title: 'Arnés Rosa NLD',
        description: 'Arnés para perros ergonómico diseñado con el modelo NLD. Tallas de código QR XS, S y M. Color Rosa.',
        price: 19.50,
        cantidad: 25
    }),

    new Product({
        imagePath: 'https://gdurl.com/tC8h',
        title: 'Arnés Rojo NLD',
        description: 'Arnés para perros ergonómico diseñado con el modelo NLD. Tallas de código QR M, L y XL. Color Rojo.',
        price: 19.50,
        cantidad: 40
    }),

    new Product({
        imagePath: 'https://gdurl.com/Y0jw',
        title: 'Collar NLB V1',
        description: 'Collar para perros ergonómico diseñado con el modelo NLD. Tallas de código QR S, M y L. Versión V1.',
        price: 9.95,
        cantidad: 20
    }),

    new Product({
        imagePath: 'https://gdurl.com/GKDg',
        title: 'Collar NLB V2',
        description: 'Collar para perros ergonómico diseñado con el modelo NLD. Tallas de código QR S, M y L. Versión V2.',
        price: 9.95,
        cantidad: 20
    }),

    new Product({
        imagePath: 'https://gdurl.com/p2hV',
        title: 'Collar NLB V3',
        description: 'Collar para perros ergonómico diseñado con el modelo NLD. Tallas de código QR M, L y XL. Versión V3.',
        price: 9.95,
        cantidad: 20
    }),

    new Product({
        imagePath: 'https://gdurl.com/pWHO',
        title: 'Collar NLB V4',
        description: 'Collar para perros ergonómico diseñado con el modelo NLD. Tallas de código QR M, L y XL. Versión V4.',
        price: 9.95,
        cantidad: 20
    }),

    new Product({
        imagePath: 'https://gdurl.com/3-kOc',
        title: 'Collar NLB V5',
        description: 'Collar para perros ergonómico diseñado con el modelo NLD. Tallas de código QR XS, S y M. Versión V5.',
        price: 9.95,
        cantidad: 0
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, res) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}