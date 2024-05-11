const BlogCategory = require("../models/blogCatModel.js");
const asyncHandler = require("express-async-handler");
const mongoDbValidation = require("../utils/mongoDbValidation.js");

//create BlogCategory
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
//update BlogCategory
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  mongoDbValidation(id);
  try {
    const updateCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//delete BlogCategory
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  mongoDbValidation(id);
  try {
    const deleteCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get a BlogCategory
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  mongoDbValidation(id);
  try {
    const getCategory = await BlogCategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get all BlogCategory
const getAllCategory = asyncHandler(async (req, res) => {

  try {
    const getAllCategory = await BlogCategory.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory
};
