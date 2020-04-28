const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../helpers/auth");
//Al visitar la página principal...
router.get("/", (req, res) => {
    res.render("index");
});
//Al visitar Abouts...
router.get("/about", (req, res) => {
    res.render("about");
});
//Al visitar maps
router.get("/maps", (req, res) => {
    res.render("maps");
});

module.exports = router;