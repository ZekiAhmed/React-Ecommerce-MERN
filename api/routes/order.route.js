import express from "express";
import CryptoJS from "crypto-js";
import orderModel from "../models/order.model.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new orderModel(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id, // you can allso use req.user.id
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(
      req.params.id // you can allso use req.user.id
    );

    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await orderModel.find(
      { userId: req.params.userId } // you can also use req.user.id
    );

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await orderModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
