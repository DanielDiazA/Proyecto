const helpers = {};
//Para saber si el usuario esta autorizado
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/users/signin');
};

module.exports = helpers;
