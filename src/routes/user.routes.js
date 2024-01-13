import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkAccessLevel } from "../middlewares/rbac.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/dashboard")
  .get(verifyJWT, checkAccessLevel("ADMIN"), (req, res) => {
    res.json({ message: "Allowed" });
  });

router
  .route("/settings")
  .get(verifyJWT, checkAccessLevel("CLIENT"), (req, res) => {
    res.json({ message: "Allowed" });
  });

router
  .route("/statistics")
  .get(verifyJWT, checkAccessLevel("ADMIN"), (req, res) => {
    res.json({ message: "Allowed" });
  });

//CRUD routes

// Get all users
router.route("/users").get(verifyJWT, checkAccessLevel("ADMIN"), getAllUsers);

// Get user by ID
router.route("/users/:userId").get(verifyJWT, getUserById);

// Update user by ID
router
  .route("/users/:userId")
  .put(verifyJWT, checkAccessLevel("ADMIN"), updateUser);

// Delete user by ID
router
  .route("/users/:userId")
  .delete(verifyJWT, checkAccessLevel("ADMIN"), deleteUser);

export default router;
