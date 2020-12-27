const { Router, json } = require("express");
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

router.get("/user-profile", getUserProfileController);
router.post("/user-profile", createUserProfileController);

module.exports = router;
