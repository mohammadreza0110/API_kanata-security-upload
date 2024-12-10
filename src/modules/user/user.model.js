const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const verifyOTPSchema = new Schema({
  code: {
    type: String,
    required: false,
    default: undefined,
  },
  expiresIn: {
    type: Number,
    required: false,
    default: 0,
  },
});

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    fullNameEnglish: {
      type: String,
      required: false,
      default: `User_${Date.now()}`, // نام پیش‌فرض منحصر به فرد
    },
    biography: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      maxlength: 11,
      minlength: 11,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      default: undefined,
    },
    verifyOTP: { type: verifyOTPSchema },
    verifyOTPToken: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    profilePicture: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
