const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  link: String,
  category: String,
  imgurl: String,
})
exports.CategoryModel = mongoose.model("categories", schema)

exports.validateCategory = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    link: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(2).max(100).required(),
    imgurl: Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}