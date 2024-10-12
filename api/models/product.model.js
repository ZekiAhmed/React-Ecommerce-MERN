import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("product.model", ProductSchema);

// you can name "product.model" or "user" or "super" anything you want
// it dosen't have to be similart with the file name which is "user.model"
