const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const mongoDbValidation = require("../utils/mongoDbValidation");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

// create Blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  mongoDbValidation(id);

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body);
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//get a Blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  mongoDbValidation(id);

  try {
    const getBlog = await Blog.findById(id)
    .populate("likes")
    .populate("dislikes")
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Blogs
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();

    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

//delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  mongoDbValidation(id);

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);

    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//like  Blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  console.log(blogId);

  // Find the blog you want to like or dislike
  const blog = await Blog.findById(blogId);

  // Find the login user
  const loginUserId = req?.user?.id;

  // Check if the user has already disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    // If already disliked, remove dislike
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { dislikes: loginUserId }, isDisliked: false },
      { new: true }
    );
    res.json(updatedBlog);
  } else {
    // If not disliked, toggle like/dislike
    const isLiked = blog?.isLiked;
    if (isLiked) {
      // If already liked, remove like
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: loginUserId }, isLiked: false },
        { new: true }
      );
      res.json(updatedBlog);
    } else {
      // If neither liked nor disliked, like the blog
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { likes: loginUserId }, isLiked: true },
        { new: true }
      );
      res.json(updatedBlog);
    }
  }
});

//dislike  Blog
const disLikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    console.log(blogId);
  
    // Find the blog you want to like or dislike
    const blog = await Blog.findById(blogId);
  
    // Find the login user
    const loginUserId = req?.user?.id;
  
    const isDisliked = blog?.isDisliked;
  
    // Check if the user has already disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId.toString() === loginUserId?.toString()
    );
  
    if (alreadyDisliked) {
      // If already disliked, remove dislike
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { dislikes: loginUserId }, isDisliked: false },
        { new: true }
      );
      res.json(updatedBlog);
    } else {
      // If not disliked, toggle like/dislike
      if (isDisliked) {
        // If already liked, remove like
        const updatedBlog = await Blog.findByIdAndUpdate(
          blogId,
          { $pull: { dislikes: loginUserId }, isDisliked: false },
          { new: true }
        );
        res.json(updatedBlog);
      } else {
        // If neither liked nor disliked, dislike the blog
        const updatedBlog = await Blog.findByIdAndUpdate(
          blogId,
          { $push: { dislikes: loginUserId }, isDisliked: true },
          { new: true }
        );
        res.json(updatedBlog);
      }
    }
  });
  
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
  

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages
};
