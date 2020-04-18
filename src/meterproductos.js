var express = require('express');
var router = express.Router();
var Product = require('./models/product');
var mongoose = require('mongoose');

//seeding data
mongoose
  .connect(
    "mongodb://heroku_71bfjd7d:sl1cd5ceso86pl9dca9upuc904@ds311968.mlab.com:11968/heroku_71bfjd7d",
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(db => console.log("(MongoDb) Productos guardados"))
  .catch(err => console.error(err));

var products = [

    new Product({
      imagePath: 'https://images.g2a.com/newlayout/323x433/1x1x0/6a05d7a7d6e6/59a01f345bafe3badf2fe473',
      title: 'FIFA18',
      description: 'EA Sports',
      price: 19.50,
      cantidad:2
    }),

    new Product({
      imagePath: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcisU6w59JmhfoWfCXUD1pu3psbHtYEollnB9lq0e.MjlSUpeVrHN67DAjSy9bRbdhhR40RzkIYdh1X3XAGKgNROwZqhbkQmodzm2iL0naGBG0kP.JhWy81Vov_OyNkceg1F5u0_drSDADkYnhYGv0jIaqglQyYMEfecOk_6fufwA-&w=200&h=300&format=jpg',
      title: 'Assasins Creed Unity',
      description: 'Ubisoft',
      price: 3000,
      cantidad:0
    }),

    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Call_of_Duty_WWII_Cover_Art.jpg/220px-Call_of_Duty_WWII_Cover_Art.jpg',
      title: 'COD WWII',
      description: 'Activision',
      price: 1800,
      cantidad:20
    }),

    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Call_of_duty_ghosts_box_art.jpg/220px-Call_of_duty_ghosts_box_art.jpg',
      title: 'COD Ghosts',
      description: 'Activision',
      price: 3200,
      cantidad:20
    }),

    new Product({
      imagePath: 'https://vignette.wikia.nocookie.net/nfs/images/a/a3/NFSUG_Boxart.jpg/revision/latest?cb=20160721184127&path-prefix=en',
      title: 'NFS Underground',
      description: 'Electronic Arts',
      price: 3200,
      cantidad:20
    }),

    new Product({
      imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Far_Cry_4_box_art.jpg/220px-Far_Cry_4_box_art.jpg',
      title: 'Far Cry IV',
      description: 'Ubisoft',
      price: 3200,
      cantidad:20
    }),

    new Product({
      imagePath: 'https://www.instant-gaming.com/images/products/1842/271x377/1842.jpg',
      title: 'Far Cry V',
      description: 'Ubisoft',
      price: 3200,
      cantidad:20
    }),

    new Product({
      imagePath: 'https://vignette.wikia.nocookie.net/gtawiki/images/7/76/CoverArt-GTAV.png/revision/latest?cb=20130826184215',
      title: 'GTA V',
      description: 'Rockstar Games',
      price: 3200,
      cantidad:20
    }),

    new Product({
      imagePath: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTchuZ_pf4pye6qBUbkkRr_jAjksz2bfxbKv0mYXG5WNcUU7OVa7W0wY8OrZfFdGDmd3gExlVaPx1HOMt.oBiJeexHjlc.puB2Nhm3wddg1aRLH0QY.QJCZ4kj0swcGqcoo2b2FozzzWioh7BpBOm9XklTX5G4eLaqKPrQz320oxaY-&w=200&h=300&format=jpg',
      title: 'Battlefield 4',
      description: 'Electronic Arts',
      price: 3200,
      cantidad:20
    })
];

var done = 0;
for(var i = 0; i<products.length; i++) {
  products[i].save(function(err, res) {
    done++;
    if(done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}