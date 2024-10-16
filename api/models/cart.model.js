import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("cart.model", cartSchema);

// you can name "user.model" or "user" or "super" anything you want
// it dosen't have to be similart with the file name which is "user.model"
