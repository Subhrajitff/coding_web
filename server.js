const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();;
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
const dotenv=require('dotenv');
const morgan=require('morgan');

dotenv.config({path:'config.env'})

const PORT=process.env.PORT || 8080
app.use(morgan('tiny'));

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
connectDB();
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

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
//endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.ejs',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.ejs',params);
})


app.post('/contact',(req,res)=>{
    var mydata= new contact(req.body);
    mydata.save().then(()=>{
        res.send("This Item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to database")
    });
   
})


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});