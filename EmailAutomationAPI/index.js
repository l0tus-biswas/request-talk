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
  pass:"Sribas@22"
    
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
      pass:"Sribas@22"
        
      }
    });
    console.log(req.query);
    
    var mailOptions = {
      from: 'Appointly.com <lotushotmail111@gmail.com>',
      to: req.query.emailAddress,
      subject: 'Your Appointly.com password has been reset',
      // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
    html:`<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover {text-decoration: underline !important;} </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; leftmargin="0">  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr> <td style="text-align:center;"> <a href="" title="" target="_blank"> <img width="220" src="https://raw.githubusercontent.com/dev-lotus/Appointly.com/main/CalendlyApp/src/assets/images/LogoWhiteBlack.png" title="" alt=""> </a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://ps.w.org/mass-users-password-reset/assets/icon-256x256.png?rev=1721166" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:500; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;">Password has been reset</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b>Hi there, </b> </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> We have recieved a forgot password request from you. And we have reset your password ! Please do use these credentials to login from now on. </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b> Your Login Credentials -</b> </p> <p style="color:#d50e0e; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b> E-Mail :</b> <a href="#" style="text-decoration:none; color:red; cursor: 'auto';">` + req.query.emailAddress + `</a></p> <p style="color:#d50e0e; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b> Password : </b> `+req.query.password+` </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"><strong>Please feel free to contact us at appointly.help@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table>  </body> </html>`
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


    app.get('/sendBookingConfirmationMail', (req, res) => {
  
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "lotushotmail111@gmail.com",
        pass:"Sribas@22"
          
        }
      });
      console.log(req.query);
      
      var mailOptions = {
        from: 'Appointly.com <lotushotmail111@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your booking has been confirmed',
          // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html:`<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover {text-decoration: underline !important;} </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; leftmargin="0">  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr> <td style="text-align:center;"> <a href="" title="" target="_blank"> <img width="220" src="https://raw.githubusercontent.com/dev-lotus/Appointly.com/main/CalendlyApp/src/assets/images/LogoWhiteBlack.png" title="" alt=""> </a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5X5nyhnCJZtELXVknjo3HcCc-00OYuPT3xQ&usqp=CAU" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:700; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;">Your booking has been confirmed</h1> <p style="text-align: center;font-size:18px; line-height: 1.3;">` + req.query.bookedName +` has confirmed your booking request for ` + req.query.eventName +`. Will be sharing the meeting details soon with you via email. We appreciate your patience.</p> <p style="color:#1e1e2d; text-align: center;font-size:16px; font-style: italic; line-height: 1.3;font-weight:700; ">Reach out to ` + req.query.bookedName +` at ` + req.query.bookedEmailAdderss +`</p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"><strong>Please feel free to contact us at appointly.help@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table>  </body> </html>`
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


      app.get('/sendBookingPendingMail', (req, res) => {
  
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "lotushotmail111@gmail.com",
          pass:"Sribas@22"
            
          }
        });
        console.log(req.query);
        
        var mailOptions = {
          from: 'Appointly.com <lotushotmail111@gmail.com>',
          to: req.query.userEmailAdderss,
          subject: 'Your booking has been submitted',
            // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
          html:`<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover {text-decoration: underline !important;} </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; leftmargin="0">  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr> <td style="text-align:center;"> <a href="" title="" target="_blank"> <img width="220" src="https://raw.githubusercontent.com/dev-lotus/Appointly.com/main/CalendlyApp/src/assets/images/LogoWhiteBlack.png" title="" alt=""> </a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5X5nyhnCJZtELXVknjo3HcCc-00OYuPT3xQ&usqp=CAU" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:700; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your booking has been submitted</h1> <p style="text-align: center;font-size:18px; line-height: 1.3;">` + req.query.bookedName +` still needs to confirm or reject the booking for ` + req.query.eventName +`. Will get in touch with you soon. We appreciate your patience.</p> <p style="color:#1e1e2d; text-align: center;font-size:16px; font-style: italic; line-height: 1.3;font-weight:700; ">Reach out to ` + req.query.bookedName +` at  ` + req.query.bookedEmailAdderss +` </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"><strong>Please feel free to contact us at appointly.help@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table>  </body> </html>`
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