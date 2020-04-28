const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/auth");

//Models//
const User = require("../models/User");
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Dog = require("../models/Dog");

////////////////////////Usuarios/////////////////////////////////
//all users//
router.get("/users", isAuthenticated, async(req, res) => {
    const users = await User.find();
    res.render("admin/all-users", { users });
});

//Eliminar usuario//
router.delete("/users/delete/:id", isAuthenticated, async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Perfil de usuario eliminado correctamente");
    res.redirect("/users");
});

/////////////////////////////Pedidos///////////////////////////////////

//all orders//
router.get("/orders", isAuthenticated, async(req, res) => {
    const orders = await Order.find().sort({ date: "desc" });
    res.render("admin/all-orders", { orders });
});







//////////////////////////////Productos//////////////////////////////////
//All products//
router.get("/products", isAuthenticated, async(req, res) => {
    const products = await Product.find();
    res.render("admin/all-products", { products });
});
//Eliminar producto//
router.delete("/products/delete/:id", isAuthenticated, async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Producto eliminado correctamente");
    res.redirect("/products");
});
//Nuevo producto
router.get("/products/add", isAuthenticated, (req, res) => {
    res.render("admin/new-product");
});

router.post("/admin/new-product", isAuthenticated, async(req, res) => {
    const { title, imagePath, description, price, cantidad } = req.body; //obtener valores desde new-product.hbs
    const errors = [];
    if (!title) {
        errors.push({ text: "Inserte nombre del producto" });
    }
    if (!imagePath) {
        errors.push({ text: "Inserte enlace de imagen del producto" });
    }
    if (!description) {
        errors.push({ text: "Inserte descripcion del producto" });
    }
    if (!price) {
        errors.push({ text: "Inserte precio del producto" });
    }
    if (!cantidad) {
        errors.push({ text: "Inserte cantdad del producto" });
    }


    //En caso de que haya un error...
    if (errors.length > 0) {
        //rendereizar de nuevo la página
        res.render("admin/new-product", {
            title,
            imagePath,
            description,
            price,
            cantidad
        });
    } else {
        const newProduct = new Product({
            title,
            imagePath,
            description,
            price,
            cantidad
        });
        await newProduct.save();
        req.flash("success_msg", "Producto añadido correctamente");
        res.redirect("/products");
    }
});

router.get("/products/edit/:id", isAuthenticated, async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("admin/edit-product", { product });
});



router.put("/admin/edit-product/:id", isAuthenticated, async(req, res) => {
    const { title, imagePath, description, price, cantidad } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        title,
        imagePath,
        description,
        price,
        cantidad
    });
    req.flash("success_msg", "Producto actualizado correctamente");
    res.redirect("/products");
});









module.exports = router;