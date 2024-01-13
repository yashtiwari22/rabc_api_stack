import { ApiError } from "../utils/ApiError.js";

const checkAccessLevel = (requiredAccessLevel) => (req, res, next) => {
  try {
    if (req.user.access_level === requiredAccessLevel) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
};

export { checkAccessLevel };
