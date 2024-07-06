// import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await userModel.create({
      pseudo,
      email,
      password,
    });
    res.status(200).send({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const getUsers = async () => {};
