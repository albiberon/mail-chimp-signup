const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        "email_address": email,
        "status": "subscribed",
        "email_type": "html",
        "merge_fields": {
          "FNAME" : firstName,
          "LNAME" : lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: `https://us6.api.mailchimp.com/3.0/lists/44831e4558`,
    method: "POST",
    headers: {
      "Authorization": "anystring 02ef6ec658b29af76441f5bd81691660-us6"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200){         
        res.sendFile(__dirname + "/success.html");
      } else {
          res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});


app.post("/failure" , function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
