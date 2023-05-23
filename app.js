//
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const fisrtName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fisrtName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/5ccf7684ca";

  const Option = {
    method: "POST",
    auth: "soham@:ef6c5c084e4f88f3df82ffaf2cbf4d0c-us13",
  };

  const request = https.request(url, Option, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server is running on localghost ${port}`);
});

//api key
//ef6c5c084e4f88f3df82ffaf2cbf4d0c-us13

//audience ID
//5ccf7684ca
