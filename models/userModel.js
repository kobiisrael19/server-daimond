const mongoose = require("mongoose");
const Joi = require("joi");
// ספרייה שיודעת לייצר ולנהל טוקנים
const jwt = require("jsonwebtoken");
const{config}=require("../config/secret")
const userSchema = new mongoose.Schema({
  userName:String,
  email:String,
  password:String,
  // הגדרת רול כסטרינג וערך דיפולטיבי של יוזר
  role:{
    type:String, default:"user"
  },
  cart_ar:{
    type:Array,default:[]
  },
  favs_ar:{
    type:Array,default:[]
  }

  // timestamps -> מוסיף מאפיינים של זמן הוספה וזמן עדכון
},{timestamps:true});


exports.UserModel = mongoose.model("users",userSchema);

exports.createToken = (user_id,role = "user") => {
  // מייצרים טוקן
  // פרמטר ראשון התכולה של הטוקן ,כרגע איי די בהמשך יהיה גם רול/תפקיד
  // פרמטר שני - מילה סודית בשביל לפענח את הטוקן
  // פרמטר שלישי תוקף הטוקן

  const token = jwt.sign({_id:user_id,role},config.TOKEN_SECRET,{expiresIn:"60000mins"})
  return token;
}


exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    userName:Joi.string ().min(2).max(150).required(),
    // email() -> בודק שהמייל תקין עם שטרודל נקודה ועוד
    email:Joi.string().min(2).max(200).email().required(),
    password:Joi.string().min(4).max(150).required()
  })

  return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(200).email().required(),
    password:Joi.string().min(4).max(150).required()
  })

  return joiSchema.validate(_reqBody);
} 