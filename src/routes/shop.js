const express = require("express");
const router = express.Router();

//Models//
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

// Helpers
const { isAuthenticated } = require("../helpers/auth");
////////////////////////////////////////////Al visitar Tienda/////////////////////////////////////////////
router.get('/shop', isAuthenticated, function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/shop', { title: 'MyCart', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
    });
});

router.get('/add_to_cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

    Product.findById(productId, function(err, product) {
        if (err) {
            res.redirect('/shop');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop');
    })
});

router.get('/add1/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

    Product.findById(productId, function(err, product) {
        if (err) {
            res.redirect('/shopping-cart');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shopping-cart');
    })
});
router.get('/add5/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

    Product.findById(productId, function(err, product) {
        if (err) {
            res.redirect('/shopping-cart');
        }
        cart.add5(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shopping-cart');
    })
});






router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/reduce5/:id', function(req, res, next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var i;

    cart.reduceByFive(productId);
    req.session.cart = cart;

    res.redirect('/shopping-cart');
});


router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeAll(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', isAuthenticated, function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});


//////////////////////Pasarelas de Pago//////////////////////////
//////////////////////Stripe//////////////////////////
router.get('/pago', isAuthenticated, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/pago', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
});

router.post('/pago', isAuthenticated, async(req, res, next) => {

    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    const stripe = require("stripe")(
        "sk_test_mb7IcbgxGOcQtWYohlxqkp9c00pcqhaoYs"
    );

    stripe.charges.create({

        amount: cart.totalPrice * 100, //centimos
        currency: 'eur',
        source: "tok_mastercard", // obtained with Stripe.js
        description: "Pago de Prueba"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/pago');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(async(err, result) => {
            await req.flash('success', 'Payment successful');
            req.session.cart = null;
            res.redirect('/shop');
        });
    });
})


module.exports = router;