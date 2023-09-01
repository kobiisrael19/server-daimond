const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { config } = require("../config/secret");

const sendEmail = (to, subject, text, file) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: config.EMAIL_USER,
      to,
      subject,
      text,
      attachments: file
        ? [
            {
              filename: file.name,
              content: file.data,
            },
          ]
        : [],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

router.post("/send-email", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "מידע לא תקין" });
  }

  const subject = "ברוך הבא לניוזלטר!";
  const text = `שלום ${username}!\n\nתודה שנרשמת לניוזלטר שלנו. נשמח לשלוח לך עדכונים מעניינים בקרוב.`;

  sendEmail(email, subject, text, null)
    .then(() => {
      res.status(200).json({ message: "אימייל נשלח בהצלחה" });
    })
    .catch((error) => {
      console.error("שגיאה בשליחת האימייל:", error);
      res.status(500).json({ error: "שגיאה בשליחת האימייל" });
    });
});

module.exports = router;

