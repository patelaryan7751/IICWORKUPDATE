// jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");

const app=express();

let pointData=["Wake Up!","Learn","Repeat"];
let workPoint=["Do Homework"];
let count=4;
let k=1;

// Setting up our database
mongoose.connect("mongodb://localhost:27017/toDo_list",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const dataSchema=new mongoose.Schema({
    _id:Number,
    item:{
        type:String,
        required:[1,"The field should not be blank"]
    }
});
const dailyData=mongoose.model("Data",dataSchema); // Data collection created



// Setting up ejs
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static("public"));


//  Normal List : localhost:5000
app.post("/list",function(req,res) {
    const newItem= new dailyData({
        _id:count,
        item:req.body.point
    });
    newItem.save();
    count++;
    dailyData.find((err,data)=>{
        if(err){
            console.log(err);
        }else{
            pointData=data;
        }
    });

    res.redirect("/");
});


app.get("/",function(req,res) {
    let day=date.getdate();
    // Updating the default data in the database if there no data
    dailyData.find((err,data)=>{
        if(err){
            console.log(err);
        }
        if(data.length==0){
            for(var i=0;i<3;i++){
                const dataDefault=new dailyData({
                    _id:i+1,
                    item:pointData[i]
                });
                dataDefault.save();
                if(i==2){console.log("Data saved successfully");}
            }
            res.render("ToDo",{ //an object which tells us the the values to be substituted
                title:day,
                newPoint:pointData,
                dataPush:"/list"
            });
        }
        if(data.length!=0){
            count=data.length + 1;
            for(let i=0;i<data.length;i++){
                pointData[i]=data[i].item;
            }
            res.render("ToDo",{ //an object which tells us the the values to be substituted
                title:day,
                newPoint:pointData,
                dataPush:"/list"
            });
        }
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
