// This function attach the user session to the response object
// The locals are used to pass data to the view
export function authMiddleware(req, res, next) {
  if (!req.session.isLoggedIn) {
    return next();
  }

  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.uid = req.session.uid;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}
