import { Request, Response, NextFunction } from "express";
import {userModel} from "../../../database/model/identity/user-model"
const bcrypt = require("bcrypt");
const env = require("dotenv");
import {createScretToken} from "../../../tokenGeneration/generateToken"; 

env.config();

const login = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "Please fill the input Fields"});
  }
  const user = await userModel.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createScretToken(user._id);
  res.cookie("token", token, {
    domain: process.env.frontend_url, // Set your domain here
    path: "/", // Cookie is accessible from all paths
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true, // Cookie will only be sent over HTTPS
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    sameSite: "none",
  });

  res.json({ token });
};

module.exports = login;