import { getDb } from "../data/database.js";
import { saltRounds } from "../utils/constants.js";
import bcrypt from "bcryptjs";

class User {
  constructor(email, password, fullName, street, postalCode, city) {
    this.email = email;
    this.password = password;
    this.name = fullName;
    this.address = {
      street: street,
      postalCode: postalCode,
      city: city,
    };
  }

  getUserWithEmail() {
    const db = getDb();

    return db.collection("users").findOne({ email: this.email });
  }

  async alreadyExists() {
    const user = await this.getUserWithEmail();
    if (user) {
      return true;
    }
    return false;
  }

  comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  async save() {
    const db = getDb();

    try {
      const hashPassword = await bcrypt.hash(this.password, saltRounds);
      const result = await db.collection("users").insertOne({
        email: this.email,
        password: hashPassword,
        name: this.name,
        address: this.address,
      });
      console.log(result);
    } catch (err) {
      console.log("Error registering User\n" + err);
    }
  }
}

export default User;
