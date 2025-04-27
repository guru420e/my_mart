import User from "../modals/userModal.js";
import { isEmpty } from "../utils/helper.js";

// Validte the user for original email through OTP or some text
// for future

export async function signupValidationMiddleWare(req, res, next) {
  const {
    email,
    confirmEmail,
    password,
    fullName: name,
    street,
    postalCode,
    city,
  } = req.body;

  // need to validate the data
  // make some function int utils file

  if (
    isEmpty(email) ||
    isEmpty(confirmEmail) ||
    isEmpty(password) ||
    isEmpty(name) ||
    isEmpty(street) ||
    isEmpty(postalCode) ||
    isEmpty(city) ||
    !userCredAreValid(email, confirmEmail, password)
  ) {
    // Change this to populate the data to view
    return res.status(422).render("customer/auth/signup", {
      errorMessage: "Please fill all the fields",
      oldInput: {
        email,
        confirmEmail,
        password,
        name,
        street,
        postalCode,
        city,
      },
    });
  }

  const userExists = await new User(email).alreadyExists();
  if (userExists) {
    return res.status(422).render("customer/auth/signup", {
      errorMessage: "User already exists",
      oldInput: {
        email,
        confirmEmail,
        password,
        name,
        street,
        postalCode,
        city,
      },
    });
  }

  next();
}

function userCredAreValid(email, confirmEmail, password) {
  return email.includes("@") || email === confirmEmail || password.length >= 6;
}
