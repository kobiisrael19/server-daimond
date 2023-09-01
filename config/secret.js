require("dotenv").config();

exports.config = {
    MONGO_DB:process.env.MONGO_DB,
    // PASS_DB:process.env.PASS_DB,
    // USER_DB:process.env.USER_DB,
    TOKEN_SECRET:process.env.TOKEN_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    CLOUD_KEY:"312378948683843",
    CLOUD_NAME:"drthosijy",
    CLOUD_SECRET:"ES3-26vKcSQrCaxh_MC1vQsbnEU"
}