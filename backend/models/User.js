const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  birthday: String,
  active: Boolean,
});

const emailConfSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    code: Number,
  },
  { timestamps: true, expireAfterSeconds: 300 },
);

const userModel = mongoose.model("User", userSchema);
const emailConfModel = mongoose.model("EmailConf", emailConfSchema);

module.exports = {
  userModel,
  emailConfModel,
};
