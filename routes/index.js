var express = require('express');
var router = express.Router();
var nodEmailer=require('nodemailer');
var fs = require('fs');
var bodyParser=require('body-parser');

/* GET home page. */
var results;
fs.readFile('json/services.json', 'utf-8', function(err,data){
  if(err){
    throw err;
  }else{
    results=JSON.parse(data);
  }
});
// Contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', {
    title : "Contact Us"
  })
})

router.post('/send', function(req, res, next) {
   var name= req.body.nom;
   var email= req.body.email;
   var stmpconfig={
     host: 'smtp.gmail.com',
     port: 465,
     secure: true,
     auth: {
      type: 'OAuth2',
      user: 'aboubakr.sb@gmail.com',
      clientId: "338114142519-h9ss0b68cthn0b38gln93vk7fhkvbfrc.apps.googleusercontent.com",
      clientSecret: "idhxOv2IJH7FS2lmh6dYEcUn",
      refreshToken: "1/_CRp7jgmqouwIq64pHC9BeBRkemc_7GHmqpUOYVNpuA",
      accessToken: "ya29.Glv_BgbgoysFQ_-lGXbXm_elg8pwUq2kY2BMGjFxyzVJ-x98b1M4wCoQP1R15V1aIgbnSTI9ZToiDVU5h7uR98A2DHKkg2w5lsCvfP6M2I64gen7hWarrJpy8741",
    },
     tls: {
       rejectUnauthorized : false
     }
   }
   var transporter = nodEmailer.createTransport(stmpconfig);
   var mailOptions = {
     from: '"Brad Traversy ?" <aboubakr.sb@gmail.com>',
     to : 'devandfb@gmail.com',
     subject: 'Hello from pcrepair',
     text: 'You have a submission from ... Name:'+ name +'Email:' + email +'Message:'+req.body.message,
     html: '<p>You have a submission from ...</p><ul><li>Name:'+req.body.nom+'</li><li>Email:' +req.body.email+'</li><li>Message:'+req.body.message+'</li>',
   }
   transporter.sendMail(mailOptions, function(error, info){
     if(error){
       return console.log(error)
     }
     console.log('Message Sent: '+ info.response);
     res.redirect('/');
   })
});

// Homepage
router.get('/', function(req, res, next){
  res.render('index');
});
router.get('/services', function(req, res, next){
  res.render('services',{services :results});
});
router.get('/about', function(req, res, next){
  res.render('about',{msg2: 'About us'});
});

module.exports = router;
