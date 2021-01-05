const { Schema, connection } = require("mongoose");

const SkillsSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    link: { type: String, required: false },
    skills: { type: [Schema.Types.ObjectId], ref: "SkillsSchema" },
    shortDescription: { type: String, required: false },
    description: { type: Array, required: false },
  },
  {
    collection: "projects",
    timestamps: true,
  }
);

module.exports = connection.model("SkillsSchema", SkillsSchema);
