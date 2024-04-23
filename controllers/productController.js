// Import required modules and packages
const { request } = require("express");
const Product = require("../models/productModules"); // Import Product model
const asyncHandler = require("express-async-handler"); // Import async handler middleware
const slugify = require("slugify"); // Import slugify for creating slugs

// Function to create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    // Generate a slug from the title if provided
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    // Create a new product using the data from the request body
    const newProduct = await Product.create(req.body);
    // Send the newly created product as a JSON response
    res.json(newProduct);
  } catch (error) {
    // Handle any errors that occur during product creation
    throw new Error(error);
  }
});

// Function to get a single product by its ID
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extracting the product ID from the request parameters
  try {
    // Find the product by its ID
    const findProduct = await Product.findById(id);
    // Send the found product as a JSON response
    res.json(findProduct);
  } catch (error) {
    // Handle any errors that occur during product retrieval
    throw new Error(error);
  }
});

// Function to update a product by its ID
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extracting the product ID from the request parameters
  try {
    // Generate a slug from the title if provided
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    // Find and update the product by its ID
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id }, // Using _id instead of id
      req.body,
      { new: true }
    );
    // If the product is not found, return a 404 error
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Send the updated product as a JSON response
    res.json(updatedProduct);
  } catch (error) {
    // Handle any errors that occur during product update
    res.status(500).json({ message: "Server Error" });
  }
});

// Function to delete a product by its ID
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extracting the product ID from the request parameters
  try {
    // Find and delete the product by its ID
    const deleteProduct = await Product.findByIdAndDelete({ _id: id }); // Using _id instead of id
    // Send the deleted product as a JSON response
    res.json(deleteProduct);
  } catch (error) {
    // Handle any errors that occur during product deletion
    throw new Error();
  }
});

// Function to get all products with filtering, sorting, pagination, and field limiting
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObject = { ...req.query, ...req.query }; // Merge query parameters from the request
    const excludeFields = ["page", "sort", "limit", "fields"]; // Define fields to exclude from the query
    excludeFields.forEach((field) => delete queryObject[field]); // Remove excluded fields from queryObject
    let queryStr = JSON.stringify(queryObject); // Convert queryObject to a JSON string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // Replace comparison operators with MongoDB equivalents
    let query = Product.find(JSON.parse(queryStr)); // Create a MongoDB query object based on the filtered query string

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" "); // Convert sort string to MongoDB sort format
      query = query.sort(sortBy); // Apply sorting to the query
    } else {
      query = query.sort("-createdAt"); // Default sorting by creation date
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" "); // Convert fields string to MongoDB field selection format
      query = query.select(fields); // Select specified fields in the query
    } else {
      query = query.select("-__v"); // Exclude '__v' field by default
    }

    // Pagination
    const page = req.query.page; // Get page number from the request query
    const limit = req.query.limit; // Get limit number from the request query
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    query = query.skip(skip).limit(limit); // Apply pagination to the query
    if (req.query.page) {
      const productCount = await Product.countDocuments(); // Get total number of products
      if (skip >= productCount) // Check if the requested page exceeds the total number of products
        throw new Error("the page you are trying is not exists"); // Throw an error if the page doesn't exist
    }

    // Execute the query and send the products as a JSON response
    const product = await query; // Execute the MongoDB query
    res.json(product); // Send the products as a JSON response
  } catch (error) {
    // Handle any errors that occur during product retrieval
    throw new Error(error); // Throw an error if there's an issue with product retrieval
  }
});


// Exporting the controller functions
module.exports = {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
