const indexR = require("./index");
const usersR = require("./users");
const categoriesR = require("./categories");
const jewelryR = require("./jewelry");
const cartItemsR = require("./cartItems");
const sendEmailR = require("./sendEmail");


exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/categories",categoriesR);
  app.use("/jewelry",jewelryR);
  app.use("/cartItems",cartItemsR);
  app.use("/sendEmail", sendEmailR);


}