const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FormSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 11,
      minlength: 11,
    },
    email: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormModel = model("form", FormSchema);
module.exports = FormModel;
