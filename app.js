const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();;
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port=80;

//define mongo schema

const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
const contact = mongoose.model('contact', contactschema);



app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'));
//endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})


app.post('/contact',(req,res)=>{
    var mydata= new contact(req.body);
    mydata.save().then(()=>{
        res.send("This Item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to database")
    });
   
})


app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});