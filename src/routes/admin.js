const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/auth");

//Models//
const User = require("../models/User");
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

////////////////////////Usuarios/////////////////////////////////
//all users//
router.get("/users", isAuthenticated, async (req, res) => {
  const users = await User.find();
  res.render("admin/all-users", { users });
});

//Elimianar usuario//
router.delete("/users/delete/:id", isAuthenticated, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Perfil de usuario eliminado correctamente");
  res.redirect("/users");
});

/////////////////////////////Pedidos///////////////////////////////////
//all orders//
router.get("/orders", isAuthenticated, async (req, res) => {
    const orders = await Order.find().sort({ date: "desc" });
    res.render("admin/all-orders", { orders });
  });



//////////////////////////////Productos//////////////////////////////////
//All products//
router.get("/products", isAuthenticated, async (req, res) => {
  const products = await Product.find();
  res.render("admin/all-products", { products });
});
//Eliminar producto//
router.delete("/products/delete/:id", isAuthenticated, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Producto eliminado correctamente");
  res.redirect("/products");
});



module.exports = router;

