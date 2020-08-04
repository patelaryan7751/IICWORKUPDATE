// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Requesting data to an external server via API using "Axios" module
app.post("/", function(req, res) {
    var userName = req.body.userName;
    var url = "https://api.github.com/users/" + userName + "/repos";

    axios.get(url).then(function(response) {
            console.log(response.status);
            var Response = response;
            if (response.status == 200) {
                var len = Response.data.length;
                var repoName = [];
                res.write("<h1> Here is a list of your repositories </h1>");
                for (var i = 0; i < len; i++) {
                    repoName[i] = Response.data[i].name;
                    res.write("<li>" + repoName[i] + "</li>");
                }
                res.send();
            } else {
                app.use(express.static("public"));
                res.sendFile(__dirname+"/failure.html");
            }

        })

        .catch(function(error) {
            console.log(error);
            /* If you are not connected to internet then the above sentence will
            throw an error of unhandled promise execution then console log only the
            error.*/
            app.use(express.static("public"));
            res.sendFile(__dirname+"/failure.html");
        });

});

app.post("/failure",function(req,res) {
    res.redirect("/");
});

app.listen(5000, function() {
    console.log("Server is online at port 5000");
});
