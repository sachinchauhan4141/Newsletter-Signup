const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile("C:\\Users\\chauh\\web d\\Newsletter-Signup\\signup.html");
});

app.post("/", function(req,res){
    const data = {
        members:[{
            email_address : req.body.email,
            status: "subscribed",
            merge_fields:{
                "FNAME": req.body.firstname,
                "LNAME": req.body.lastname
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/8452be472a";
    
    const options = {
        method:"POST",
        auth:"sachin:5119fa38152001f75bd94b017e9d8db9-us21",
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode = 200){
            res.sendFile("C:\\Users\\chauh\\web d\\Newsletter-Signup\\success.html");
        }else{
            res.sendFile("C:\\Users\\chauh\\web d\\Newsletter-Signup\\failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server running at port 3000");
});