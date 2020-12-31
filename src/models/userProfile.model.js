const { Schema, connection } = require("mongoose");

const SocialProfileSchema = new Schema({
  type: { type: String, required: true },
  img: { type: String, required: true },
  url: { type: String, require: true },
});

const UserProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    description: { type: String },
    socialProfile: { type: [SocialProfileSchema] },
    skills: { type: [Schema.Types.ObjectId], ref: "SkillsSchema" },
  },
  {
    collection: "user_profile",
    timestamps: true,
  }
);

module.exports = connection.model("UserProfileSchema", UserProfileSchema);
