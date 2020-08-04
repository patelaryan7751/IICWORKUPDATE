// jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

const app=express();

// Setting up ejs
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));

const pointData=["Wake Up!","Learn","Repeat"];
const workPoint=["Submit Homework"];


//  Normal List : localhost:5000
app.post("/list",function(req,res) {
    var Data=req.body.point;
    pointData.push(Data);
    res.redirect("/");
});

app.get("/",function(req,res) {
    let day=date.getdate();
    res.render("ToDo",{ //an object which tells us the the values to be substituted
        title:day,
        newPoint:pointData,
        dataPush:"/list"
    });
});

 //  Work List : localhost:5000/work
app.get("/work",function(req,res) {

    res.render("ToDo",{
        title:"Work List",
        newPoint:workPoint,
        dataPush:"/workList"
    });
});

app.post("/workList",function(req,res) {
    var Data=req.body.point;
    workPoint.push(Data);
    res.redirect("/work");
});


app.listen(5000,function() {
    console.log("Server is online at port 5000");
});
