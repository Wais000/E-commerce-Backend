const express = require("express");
const {
  createUser,
  LoginUserController,
  getAllUsers,
  getSingUser,
  deleteSingUser,
  updatedUser,
  blockUser,
  unblockUser,
  HandelRefreshToken,
  logout,
} = require("../controllers/userController.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");



const router = express.Router();

router.post("/register", createUser);
router.post("/login", LoginUserController);
router.get("/all-users", getAllUsers);

router.get("/refresh", HandelRefreshToken);
router.get("/logout", logout);
router.get("/:id",authMiddleware,isAdmin, getSingUser);
router.delete("/:id", deleteSingUser);
router.put("/edit-user",authMiddleware, updatedUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser );
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser );

module.exports = router;
