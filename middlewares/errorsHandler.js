function handleError(err, req, res, next) {
  console.log(err);
  res.status(500).render("customer/error/500");
}

export default handleError;
