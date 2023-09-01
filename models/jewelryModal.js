const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  info: String,
  price: Number,
  category: String,
  img_url: String,
},{timestamps:true})
exports.JewelryModel = mongoose.model("jewelry", schema)

exports.validateJewelry = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    info: Joi.string().min(2).max(600).required(),
    price: Joi.number().min(1).max(99999).required(),
    category: Joi.string().min(2).max(100).required(),
    img_url: Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}