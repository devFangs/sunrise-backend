const { Router, json } = require("express");

const { loginController } = require("../controllers/auth/login.controller");
const { signupController } = require("../controllers/auth/signup.controller");
const {
  createUserProfileController,
} = require("../controllers/userProfile/createUserProfile.controller");
const {
  getUserProfileController,
} = require("../controllers/userProfile/getUserProfile.controller");

const router = Router();
router.use(json());

router.get("/ping", (req, res, next) => {
  return res.send("Successfully inside routes");
});

router.post("/sign-up", signupController);
router.post("/login", loginController);

router.get("/user-profile", getUserProfileController);
router.post("/user-profile", createUserProfileController);

module.exports = router;
