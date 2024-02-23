const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv  = require("dotenv");


const app = express();

dotenv.config();

const port = process.env.PORT || 5000;


const username = process.env.USER_NAME;
const userpassword = process.env.USER_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${userpassword}@cluster0.qlzyu9t.mongodb.net/registrationformDB`,{
    useNewUrlParser :true,
    useUnifiedTopology :true 
});
module.exports = mongoose.connection;

//Registration Schema
const registrationschema = new mongoose.Schema({
    name :String,
    email :  String,
    password : String 
});

//module of Schema
const Registration = mongoose.model("Registration",registrationschema);
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get("/", (req,res) =>{
    res.sendFile(__dirname+'/Pages/index.html');

});
app.post("/register",async(req,res)=>{
       
   try {
    const {name,email,password} = req.body;
        const registrationdata = new Registration({
            name,
            email,
            password,
        });
     registrationdata.save();
       res.redirect("/sucess");

}
    catch (error) {
        console.log(error);
        res.redirect("/error");
       }});

app.get("/sucess",(req,res) =>{
    res.sendFile(__dirname + "/Pages/sucessfullpage.html");
})
app.get("/error",(req,res) =>{
    res.sendFile(__dirname + "/Pages/errorpage.html");
})

app.listen(port,function(){
    console.log(`Server is Runing on ${port}`);
    });