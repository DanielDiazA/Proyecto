const express = require('express');
const router = express.Router();

//Al visitar la página principal...
router.get('/', (req, res) => {
  res.render('index');
});
//Al visitar Abouts...
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
