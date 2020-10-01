// Install Express, Mongoose, Dotenv, Cors for the backend dependencies
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const csvToJSON = require('convert-csv-to-json');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000; 
const csvToJSONRouter =  require('./routers/csv_to_json');

app.use(cors());
app.use(express.json());

const URI = "mongodb+srv://skund:QOqUfbCwQ1SerMoW@cluster0.xqm0i.mongodb.net/HealthVectors?retryWrites=true&w=majority";

mongoose.connect( URI, {useNewUrlParser:true, useCreateIndex:true})
.then( () => {
    console.log("MongoDB connection is established by your server");
}).catch( err => {
    console.log("The error is...",err);
}); 

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(csvToJSONRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
});

// let json = csvToJSON.getJsonFromCsv("data.csv");
// json.forEach((jsoN)=> {
//     console.log(jsoN);
// })

