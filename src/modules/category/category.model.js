const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

// تعریف اسکیما برای محتوای محلی
const LocalizedCategorySchema = new Schema(
  {
    language: { type: String, required: true }, // زبان
    name: { type: String, required: true }, // نام دسته‌بندی
    slug: { type: String, required: true }, // شناسه دسته‌بندی
  },
  { _id: false }
); // برای جلوگیری از ایجاد _id برای هر زبان

const CategorySchema = new Schema(
  {
    localizedContent: [LocalizedCategorySchema], // اطلاعات چندزبانه
    parent: { type: Types.ObjectId, ref: "Category", required: false }, // والد دسته‌بندی
    parents: {
      type: [Types.ObjectId],
      ref: "Category",
      required: false,
      default: [],
    },
  },
  { versionKey: false, id: false, toJSON: { virtuals: true } }
);

// تعریف مجازی برای کودکان
CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

// توابع کمکی
CategorySchema.pre("find", autoPopulate);
CategorySchema.pre("findOne", autoPopulate);

function autoPopulate(next) {
  this.populate([{ path: "children" }]);
  next();
}

module.exports = model("Category", CategorySchema);
