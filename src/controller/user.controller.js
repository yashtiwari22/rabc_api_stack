import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  console.log(email);

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user password");
  }

  const { accessToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findById(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users) {
      throw new ApiError(404, "Users not found");
    }
    return res.status(200).json(new ApiResponse(200, users, "All Users"));
  } catch (error) {
    throw new ApiError(500, "Error getting users");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.userId);
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "Single user"));
  } catch (error) {
    throw new ApiError(500, "Error getting user");
  }
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, access_level } = req.body;
    console.log(username, email, access_level);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, email, access_level },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Updated user successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating user");
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      throw new ApiError(404, "User not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User deleted successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error deleting user");
  }
});
export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
