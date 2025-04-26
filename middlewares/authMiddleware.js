export function authMiddleware(req, res, next) {
  if (!req.session.isLoggedIn) {
    return next();
  }

  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.uid = req.session.uid;
  next();
}
