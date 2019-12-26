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
        email_address: email,
        status: "subscribed",
        merge_fields: {
          MERGE1: firstName,
          MERGE2: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us6.api.mailchimp.com/3.0/lists/44831e4558",
    method: "POST",
    headers: {
      Authorization: "anystring 02ef6ec658b29af76441f5bd81691660-us6"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
