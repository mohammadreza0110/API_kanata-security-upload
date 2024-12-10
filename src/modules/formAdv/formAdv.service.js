const autoBind = require("auto-bind");

const formAdvModel = require("./formAdv.model");


class formAdvService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = formAdvModel;
  }

  async getFormById(id) {
    try {
      const form = await this.#model.findById(id);
      return form;
    } catch (error) {
      throw new Error("Error fetching form");
    }
  }

  async getAllForms(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const forms = await  this.#model.find().skip(skip).limit(limit);
    const totalForms = await  this.#model.countDocuments();

    return {
      totalForms,
      totalPages: Math.ceil(totalForms / limit),
      currentPage: page,
      forms,
    };
  }

  // Create a new form
  async createForm(formData) {
    try {
      const newForm = new this.#model(formData);
      const savedForm = await newForm.save();
      return savedForm;
    } catch (error) {
      console.log("Detailed Error:", error); // نمایش لاگ خطا
      throw new Error(error.message || "Error creating form");
    }
  }


  // Update form by ID
  async updateForm(id, updatedData) {
    try {
      const updatedForm = await this.#model.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return updatedForm;
    } catch (error) {
      throw new Error("Error updating form");
    }
  }

  // Delete form by ID
  async deleteForm(id) {
    try {
      const deletedForm = await this.#model.findByIdAndDelete(id);
      return deletedForm;
    } catch (error) {
      throw new Error("Error deleting form");
    }
  }
}

module.exports = new formAdvService();
