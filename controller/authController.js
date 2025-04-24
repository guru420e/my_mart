import e from "express";
import User from "../modals/userModal.js";

// render the signup page
function signupConroller(req, res) {
  res.render("customer/auth/signup");
}

// handles the post request for signup
async function postSignupConroller(req, res) {
  // need to add the validation for the email and password
  const { email, confirmEmail, password, fullName: name, street, postalCode, city } = req.body;

  const newUser = new User(email, password, name, street, postalCode, city);

  await newUser.save();

  res.redirect("/login");
}

export { signupConroller, postSignupConroller };
