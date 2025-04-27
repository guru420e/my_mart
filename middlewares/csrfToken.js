function csurfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

export default csurfToken;