const mongoose = require('mongoose');
const url= "mongodb+srv://Mansikashyap:15242004@cluster0.ibzkxvo.mongodb.net/apitestingtool?retryWrites=true&w=majority&appName=Cluster0"

//asynchrounous function
mongoose.connect(url)
.then((result) => {
    console.log("Database connected");
    
}).catch((err) => {
    
    console.log(err);
});

console.log("task 1")
console.log("task 2")

module.exports=mongoose;