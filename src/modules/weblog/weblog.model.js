const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LocalizedContentSchema = new Schema({
  language: { type: String },
  title: { type: String },
  content: { type: String },
});

// اصلاح اسکیمای پاسخ‌ها
const AnswerSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  content: { type: String },
  datePosted: { type: Date, default: Date.now },
  isVisible: { type: Boolean, default: false },
  // به جای ارجاع به this، یک array از ObjectIds به پاسخ‌های خود اضافه می‌کنیم
  parentCommentId: { type: mongoose.Types.ObjectId, ref: "Comment" }, // ارجاع به کامنت پدر
  answers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }], // استفاده از ObjectId برای پاسخ‌های تو در تو
});

const CommentSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  content: { type: String },
  datePosted: { type: Date, default: Date.now },
  isVisible: { type: Boolean, default: false },
  answers: [AnswerSchema], // پاسخ‌ها از اسکیمای `AnswerSchema` پیروی می‌کنند
});

const WeblogSchema = new Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "user" }, // صاحب وبلاگ
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  image: { type: String, default: null },
  dateCreated: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  comments: [CommentSchema], // لیست کامنت‌ها
  localizedContent: [LocalizedContentSchema],
});

const WeblogModel = model("Weblog", WeblogSchema);
module.exports = WeblogModel;
