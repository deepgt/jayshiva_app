const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const {google} = require('googleapis');
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })


require('dotenv').config();

const app = express();

const CLIENT_ID = '806549128426-ilgab9875noeb30pckp7utbrjked0iit.apps.googleusercontent.com';
const CLEINT_SECRET = 'ppFWwjRGA33xoJy3NDdK6_rz';
const REDIRECT_URI ='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04GzBm0r91mT-CgYIARAAGAQSNwF-L9Irtya00-gbM2mTEhaetdNe_0_giatSUiL3UfL-BuyTRj4cBg9hyVivi7A1SujX292YV8I';
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
  );

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
let accessToken = oAuth2Client.getAccessToken();

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

app.post("/send" ,(req, res) => {
  console.log(req.body)

  const output = `<p>you have a new post</p>
  <ul>
    <li>product:        ${req.body.productname}</li>
    <li>description:    ${req.body.productdescription}</li>
    <li>features:       ${req.body.productfeatures}</li>
    <li>short description:   ${req.body.productshortdescription}</li>
    <li>color:          ${req.body.color}</li>
    <li>size:           ${req.body.size}</li>
    <li>brand:          ${req.body.brand}</li>
    <li>sell price:     ${req.body.sellprice}</li>
    <li>sell quantity:  ${req.body.sellquantity}</li>
    <li>regular price   ${req.body.regularprice}</li>

    
    <li>productdescription:       <img src=${req.body.productdescriptionimageURL} /></li>
    <li>productfeatures:          <img src=${req.body.productfeaturesimageURL} /></li>
    <li>productfeatures:          <img src=${req.body.productshortdescimageURL} /></li>
    <li>product main:             <img src=${req.body.productimageURL} /></li>
    <li>gallery:                  <img src=${req.body.galleryimageURL} /></li>

  </ul>`;

  let transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
      type: 'OAuth2',
      user:process.env.EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLEINT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken 
    }
  })
  
  let mailOptions = {
    from: "pisces981111@gmail.com", // sender address
    to: "dipeshkumargupta99@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // let attachments =[{
  //   filename: 'product features image',
  //   path: `${req.body.productdescriptionimageURL}`,
  //   cid: 'productfeaturesimage' //same cid value as in the html img src
  // },{
  //   filename: 'product short desc image',
  //   path: `${req.body.productshortdescimageURL}`,
  //   cid: 'productshortdescimage'
  // },{
  //   filename: 'product features image',
  //   path: `${req.body.productimageURL}`,
  //   cid: 'productimage'
  // },{
  //   filename: 'gallery image',
  //   path: `${req.body.galleryimageURL}`,
  //   cid: 'galleryimage'
  // },
  // {
  //   filename: 'product description image',
  //   path: `${req.body.productdescriptionimage}`,
  //   cid: 'productdescriptionimage'
  // }
  // ]

  // send mail with defined transport object
  transport.sendMail(mailOptions, 
    // attachments,
    (error, info) => {
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
