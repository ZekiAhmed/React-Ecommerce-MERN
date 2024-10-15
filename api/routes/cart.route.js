import express from "express";
import CryptoJS from "crypto-js";
import cartModel from "../models/cart.model.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new cartModel(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      req.params.id, // you can allso use req.user.id
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(
      req.params.id // you can allso use req.user.id
    );

    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await cartModel.findOne(
      { userId: req.params.userId } // you can also use req.user.id
    );

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await cartModel.find();

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
