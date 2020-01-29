const express = require("express");
const router = express.Router();

// Models
const Dog = require("../models/Dog");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Dog
router.get("/dogs/add", isAuthenticated, (req, res) => {
  res.render("dogs/new-dog");
});

router.post("/dogs/new-dog", isAuthenticated, async (req, res) => {
  const { nombreperro, raza, edadperro, descripcion, tlfd, tlfc } = req.body; //obtener valores desde new-dog.hbs
  const errors = [];
  if (!nombreperro) {
    errors.push({ text: "Inserte nombre del perro" });
  }
  if (!raza) {
    errors.push({ text: "Inserte raza del perro" });
  }
  if (!edadperro) {
    errors.push({ text: "Inserte edad del perro" });
  }
  if (!descripcion) {
    errors.push({ text: "Inserte descripción del perro" });
  }
  if (!tlfd) {
    errors.push({ text: "Inserte numero de contacto del dueño" });
  }
  if (!tlfc) {
    errors.push({ text: "Inserte numero de contacto de la clinica" });
  }

  //En caso de que haya un error...
  if (errors.length > 0) {
    //rendereizar de nuevo la página
    res.render("dogs/new-dog", {
      errors,
      nombreperro,
      raza,
      edadperro,
      descripcion,
      tlfd,
      tlfd
    });
  } else {
    const newDog = new Dog({
      nombreperro,
      raza,
      edadperro,
      descripcion,
      tlfd,
      tlfc
    });
    newDog.user = req.user.id;
    /* newGog.nombred=req.user.nombred;
    newGog.apellidod=req.user.apellidod;
    newDog.called=req.user.called;
    newGog.tlfd=req.user.tlfd;*/
    await newDog.save();
    req.flash("success_msg", "Perfil de perro creado");
    res.redirect("/dogs");
  }
});

// Get All Dogs
router.get("/dogs", isAuthenticated, async (req, res) => {
  const dogs = await Dog.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("dogs/all-dogs", { dogs });
});

// Edit Dogs
router.get("/dogs/edit/:id", isAuthenticated, async (req, res) => {
  const dog = await Dog.findById(req.params.id);
  if (dog.user != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/dogs");
  }
  res.render("dogs/edit-dog", { dog });
});

router.put("/dogs/edit-dog/:id", isAuthenticated, async (req, res) => {
  const { nombreperro, raza, edadperro, descripcion, tlfd, tlfc } = req.body;
  await Dog.findByIdAndUpdate(req.params.id, {
    nombreperro,
    raza,
    edadperro,
    descripcion,
    tlfd,
    tlfc
  });
  req.flash("success_msg", "Perfil de perro actualizado correctamente");
  res.redirect("/dogs");
});

//QR
router.get("/dogs/qr/:id", isAuthenticated, async (req, res) => {
  const dog = await Dog.findById(req.params.id);
  if (dog.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/dogs");
  }
  res.render("dogs/generador-qr", { dog });
});

router.get("/dogs/generador-qr/:id", isAuthenticated, async (req, res) => {
  res.redirect("/dogs");
});


// Delete Dogs
router.delete("/dogs/delete/:id", isAuthenticated, async (req, res) => {
  await Dog.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Perfil de perro eliminado correctamente");
  res.redirect("/dogs");
});

module.exports = router;
