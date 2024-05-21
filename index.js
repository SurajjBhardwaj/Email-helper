// server side code in express

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json()); // Parses incoming requests with JSON payloads

const sendEmail = async (name, phone, country) => {
    try {
      

        console.log(process.env.user);
        console.log(process.env.PASS);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.user,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: process.env.email, // sai email
      subject: "you have recieved a new enquiry",
      html: `
    
    <p> Enquiry Details : </p>

    name : ${name},
    phone : ${phone},
    country : ${country}
    `,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

app.get("/", (req, res) => {

    res.send("hey bro");
});


app.post("/enquiryEmail", async (req, res) => {

    try {

        console.log("started");


        const { name, phone, country } = req.body;
        await sendEmail(name, phone, country);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
    
