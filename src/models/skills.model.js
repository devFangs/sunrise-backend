const { Schema, connection } = require("mongoose");

const SkillsSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    collection: "skills",
    timestamps: true,
  }
);

module.exports = connection.model("SkillsSchema", SkillsSchema);
