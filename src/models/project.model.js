const { Schema, connection } = require("mongoose");

// Reason for saving username instead of user objectId
// is because when querying, we do not know the user objectId
// It would reduce the steps to find the project if we just
// tag the username to the project

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    link: { type: String, required: false },
    skills: { type: [Schema.Types.ObjectId], ref: "SkillsSchema" },
    shortDescription: { type: String, required: false, maxlength: 200 },
    description: { type: Array, required: false },
    creator: { type: String, required: true },
  },
  {
    collection: "projects",
    timestamps: true,
  }
);

module.exports = connection.model("ProjectSchema", ProjectSchema);
