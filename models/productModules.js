const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", " Lenovo"],
    },
    color: {
      type: String,
      enum: ["Black", "Red", " Green"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    sild: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    rating: [
      {
        start: Number,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
