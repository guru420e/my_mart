// render the signup page
function signupConroller(req, res) {
  res.render('customer/auth/signup');
}


// handles the post request for signup
function postSignupConroller(req, res) {
  console.log(req.body);
  res.send('Post request for signup');
}



export { signupConroller ,postSignupConroller};
