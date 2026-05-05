import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { createUser, findUser } from "../model/userModel.js"

export const SECRET_KEY = "EXPENCE_TRACK"

export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // clean input
    email = email.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.json({ message: "All fields required" });
    }

    const userExist = await findUser(email);

    if (userExist.length > 0) {
      return res.json({ message: "User already exists. Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(name, email, hashedPassword);

    return res.json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error);
    return res.json({ message: "Something went wrong" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // clean input
    email = email.trim().toLowerCase();

    const users = await findUser(email);

    // ✅ check array properly
    if (!users || users.length === 0) {
      return res.json({ message: "User does not exist. Please register" });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token: token,
    });

  } catch (error) {
    console.log(error);
    return res.json({ message: "Something went wrong" });
  }
};