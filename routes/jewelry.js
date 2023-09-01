const express = require("express");
const { auth } = require("../middlewares/auth");
const { JewelryModel, validateJewelry } = require("../models/jewelryModal");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    const perPage = req.query.perPage || 20;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;
    const category = req.query.category;
    const search = req.query.s

    let filterFind = {}
    if(category){
      filterFind = {category:category}
    }
    if(search){
      const searchExp = new RegExp(search,"i");
      filterFind = {$or: [{name:searchExp},{info:searchExp}]}
    }
    const data = await JewelryModel
    .find(filterFind)
    .limit(perPage)
    .skip(page * perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/count", async(req,res) => {
  try{
    const perPage = req.query.perPage || 20;
    const category = req.query.category;
    const search = req.query.s;
    const user_id = req.query.user_id;
    let filterFind = {}
    if(category){
      filterFind = {category_url:category}
    }
    if(search){
      const searchExp = new RegExp(search,"i");
      filterFind = {$or:[{name:searchExp},{info:searchExp}]}
    }
    if(user_id){
      filterFind = {user_id}
    }
    const count = await JewelryModel.countDocuments(filterFind);
    res.json({count,pages:Math.ceil(count/perPage)})
    
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/single/:id" , async(req,res) => {
  try{
    const id = req.params.id;
    const data = await JewelryModel.findOne({_id:id});
    res.json(data); 
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
router.post("/",auth ,async (req, res) => {
  const validBody = validateJewelry(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const jewelry = new JewelryModel(req.body);
    jewelry.user_id = req.tokenData._id;
    await jewelry.save();
    res.json(jewelry);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/groupIds", async(req,res) => {
  try{
    if(!Array.isArray(req.body.cart_ar)){
      return res.status(400).json({msg:"You need to send cart_ar as array"});
     }
   const data = await JewelryModel.find({_id:{$in:req.body.cart_ar}}).limit(1000)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id", auth, async(req,res) => {
  const validBody = validateJewelry(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const id = req.params.id;
    let data;
    if(req.tokenData.role != "user"){
      data =  await JewelryModel.updateOne({_id:id},req.body)
    }
    else{
      data = await JewelryModel.updateOne({_id:id,user_id:req.tokenData._id},req.body)

    }
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", auth, async(req,res) => {
  try{
    const id = req.params.id;
    let data;
    if(req.tokenData.role != "user"){
      data = await JewelryModel.deleteOne({_id:id})
    }
    else{
      data = await JewelryModel.deleteOne({_id:id,user_id:req.tokenData._id})
    }
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;