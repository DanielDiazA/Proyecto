const router = require("express").Router();
const passport = require("passport");

// Models
const User = require("../models/User");
//Helper
const { isAuthenticated } = require("../helpers/auth");
//Registro
router.get("/users/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/users/signup", async(req, res) => {
    let errors = [];
    const {
        nombre,
        apellido,
        calle,
        tlf,
        email,
        password,
        confirm_password
    } = req.body;
    //Insertar nombre
    if (nombre.length <= 0) {
        errors.push({ text: "Inserte el Nombre" });
    }
    //Insertar apellido
    if (apellido.length <= 0) {
        errors.push({ text: "Inserte el Apellido" });
    }
    //Insertar calle
    if (calle.length <= 0) {
        errors.push({ text: "Inserte la Calle" });
    }
    //Insertar teléfono
    if (tlf.length <= 0) {
        errors.push({ text: "Inserte el Teléfono" });
    }
    //Insertar email
    if (email.length <= 0) {
        errors.push({ text: "Inserte Email" });
    }
    //Pass de mas de 6 caracteres
    if (password.length < 6) {
        errors.push({
            text: "Las contraseña debe de ser de al menos 6 caracteres"
        });
    }
    //Deben coincidir las contraseñas
    if (password != confirm_password) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }

    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            nombre,
            apellido,
            calle,
            tlf,
            email,
            password,
            confirm_password
        });
    } else {
        const UserMail = await User.findOne({ email: email }); //comprobar que el correo no esta registrado
        const newUser = new User({ nombre, apellido, calle, tlf, email, password });
        if (UserMail) {
            req.flash("error_msg", "Email en uso");
            res.redirect("/users/signup");
        } else {
            newUser.password = await newUser.encryptPassword(password); //cifrar pass
            await newUser.save();
            req.flash("success_msg", "Bienvenido a NeverLostDog");
            res.redirect("/users/signin");
        }
    }
});
//Logeo
router.get("/users/signin", (req, res) => {
    res.render("users/signin");
});
//Autentificacion
router.post(
    "/users/signin",
    passport.authenticate("local", {
        successRedirect: "/dogs",
        failureRedirect: "/users/signin",
        failureFlash: true
    })
);

//Editar perfil
router.get("/users/modificaruser", isAuthenticated, async(req, res) => {
    res.render("users/modificar-user");
});

router.put("/users/modificaruser", isAuthenticated, async(req, res) => {
    let errors = [];
    const { nombre, apellido, calle, tlf, email, password, confirm_password } = req.body;
    //Insertar nombre
    if (nombre.length <= 0) {
        errors.push({ text: "Inserte el Nombre" });
    }
    //Insertar apellido
    if (apellido.length <= 0) {
        errors.push({ text: "Inserte el Apellido" });
    }
    //Insertar calle
    if (calle.length <= 0) {
        errors.push({ text: "Inserte la Calle" });
    }
    //Insertar teléfono
    if (tlf.length <= 0) {
        errors.push({ text: "Inserte el Teléfono" });
    }
    //Pass de mas de 6 caracteres
    if (password.length < 6) {
        errors.push({
            text: "Las contraseña debe de ser de al menos 6 caracteres"
        });
    }
    //Deben coincidir las contraseñas
    if (password != confirm_password) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }

    if (errors.length > 0) {
        res.render("users/modificar-user", {
            errors,
            nombre,
            apellido,
            calle,
            tlf,
            email,
            password,
            confirm_password
        });
    } else {

        const usuarioM = await User.findByIdAndUpdate(req.user.id, {
            nombre,
            apellido,
            calle,
            tlf,
            email,
            password,
        });
        usuarioM.password = await usuarioM.encryptPassword(password);
        await usuarioM.save();
        req.flash("success_msg", "Perfil actualizado correctamente");
        res.redirect("/dogs");
    }
});

//Deslogeo
router.get("/users/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "Has salido de la aplicación");
    res.redirect("/users/signin");
});

module.exports = router;