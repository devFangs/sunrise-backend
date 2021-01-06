const { Schema, connection } = require("mongoose");

const SkillsSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    type: { type: String, required: false },
  },
  {
    collection: "skills",
    timestamps: true,
  }
);

module.exports = connection.model("SkillsSchema", SkillsSchema);
