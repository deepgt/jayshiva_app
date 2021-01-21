const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const Jimp = require("jimp");

const app = express();

//body parser middleware
app.use(
  bodyParser.raw({
    type: "image/png",
    limit: "10mb",
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("contact");
});

app.post("/send", (req, res) => {
  const image = req.body.productimage;
  try {
    Jimp.read(image, (err, input) => {
      if (err) throw err;
      input.sepia();

      input.getBuffer(Jimp.AUTO, (err, output) => {
        if (err) throw err;

        res.writeHead(200, { "Content-Type": "image/png" });
        return res.end(output, "binary");
      });
    });
  } catch (err) {
    return res.status(400).send(`${err.message}`);
  }

  const output = `<p>you have a new post</p>
  <ul>
    <li>product:        ${req.body.productname}</li>
    <li>description:    ${req.body.productdescription}</li>
    <li>features:       ${req.body.productfeatures}</li>
    <li>short description:   ${req.body.productshortdescription}</li>
    <li>image:          ${req.body.productfeaturesimage}</li>
    <li>image:         <img src=${req.body.productshortdescimage}/> </li>
    <li>image:          ${req.body.productimage}</li>                
    <li>image:          ${req.body.galleryimage}</li>
    <li>color:          ${req.body.color}</li>
    <li>size:           ${req.body.size}</li>
    <li>brand:          ${req.body.brand}</li>
    <li>sell price:     ${req.body.sellprice}</li>
    <li>sell quantity:  ${req.body.sellquantity}</li>
    <li>regular price   ${req.body.regularprice}</li>
  </ul>`;

  //nodemail
  const auth = {
    auth: {
      api_key: "428fda0e673b541423478803a42f249c-e438c741-aeb493d5",
      domain: "sandboxf1075850693648d8a24441f6e9330b9d.mailgun.org",
    },
  };

  let transporter = nodemailer.createTransport(mailGun(auth));

  let mailOptions = {
    from: "pisces981111@gmail.com", // sender address
    to: "thakurisinghprashant@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("message sent :%s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });

  console.log(output);
});

app.listen(5000, () => {
  console.log("server has started");
});
