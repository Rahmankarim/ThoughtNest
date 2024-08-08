import { Request, Response, NextFunction } from "express";
import {userModel} from "../../../database/model/identity/user-model"
import {createScretToken} from "../../../tokenGeneration/generateToken"; 
const bcrypt = require("bcrypt");

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("Fill all input Fields");
    }

    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = createScretToken(savedUser._id);

    res.cookie("token", token, {
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "none",
    });

    console.log("cookie set successfully");

    res.json(savedUser);
  } catch (error) {
    console.log("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};

 export {createUser};
