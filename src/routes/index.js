const { Router, json } = require("express");

const { loginController } = require("../controllers/auth/login.controller");
const { signupController } = require("../controllers/auth/signup.controller");
const {
  createUserProfileController,
} = require("../controllers/userProfile/createUserProfile.controller");
const {
  getUserProfileController,
} = require("../controllers/userProfile/getUserProfile.controller");
const { tokenValidator } = require("../middlewares/token.validator");

const router = Router();
router.use(json());

router.get("/ping", (req, res, next) => {
  return res.send("Successfully inside routes");
});

router.post("/sign-up", signupController);
router.post("/login", loginController);

router.get("/user-profile", getUserProfileController);

router.use(tokenValidator);

router.post("/user-profile", createUserProfileController);
router.get("/auth-ping", (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
