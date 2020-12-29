const { Schema, connection } = require("mongoose");
const bcrypt = require("bcrypt");

const UserAuthSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    hasProfile: { type: Boolean, require: true, default: false },
    profile: { type: Schema.Types.ObjectId },
  },
  {
    collection: "user_auth",
    timestamps: true,
  }
);

UserAuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = connection.model("UserAuthSchema", UserAuthSchema);
