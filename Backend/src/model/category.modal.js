const mongoose = require("mongoose");
const Product = require("./product.modal");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Category Already exists .."],
      lowercase: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.methods.removeProducts = async function () {
  const category = this;
  await Product.deleteMany({ category: category._id });
};

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
