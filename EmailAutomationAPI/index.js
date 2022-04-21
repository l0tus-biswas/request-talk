const express = require('express')
const nodemailer= require('nodemailer')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config();

const port = 3000
app.use(cors())
app.get('/sendmail', (req, res) => {
  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "lotushotmail111@gmail.com",
    pass: "Sribas@22"
    
  }
});
console.log(req.query);

var mailOptions = {
  from: 'Appointly.com <lotushotmail111@gmail.com>',
  to: req.query.eventAttendeeEmail,
  subject: 'Confirmed : You have a meeting with ' + req.query.appointWith,
  html: '<p>Summary : '+ req.query.eventSummary + "</p>" + '<p>Date : '+ req.query.dateEvent + "</p>" + '<p>Time : '+ req.query.time + "</p>" + '<p>Location : Google Meet ( '+ req.query.location + " ) </p>" +  '<p>Attendees : '+ req.query.appointWith + " ( " + req.query.appointWithEmail + " ) " + req.query.eventAttendee  + " ( " + req.query.eventAttendeeEmail + " ) " +   "</p>" + '<p>About the Event : '+ req.query.eventDesc + "</p>"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.send(JSON.stringify({status:"false"}));
  
  } else {
    res.send(JSON.stringify({status:"true"}));
    console.log('Email sent: ' + info.response);
     
  }
});
res.send(true);
})

app.get('/resetMail', (req, res) => {
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "lotushotmail111@gmail.com",
      pass: "Sribas@22"
      
    }
  });
  console.log(req.query);
  
  var mailOptions = {
    from: 'Appointly.com <lotushotmail111@gmail.com>',
    to: req.query.emailAddress,
    subject: 'Your have reset your password',
    html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(JSON.stringify({status:"false"}));
    
    } else {
      res.send(JSON.stringify({status:"true"}));
      console.log('Email sent: ' + info.response);
       
    }
  });
  res.send(true);
  })

app.get("/", function (req, res) {
  res.send("<h1>Email is Live</h1>")
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));