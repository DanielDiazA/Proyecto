const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/auth");

//Models//
const User = require("../models/User");
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

//Usuarios//




//Pedidos//
//all orders//
router.get("/orders", isAuthenticated, async (req, res) => {
    const orders = await Order.find().sort({ date: "desc" });
    res.render("admin/all-orders", { orders });
  });



//Productos//


module.exports = router;
