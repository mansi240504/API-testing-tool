const {Schema, model}=require("../Connection");

const mySchema= new Schema({
    name :String,
    email: {type: String,require: true ,unique: true},
    city :{type:String, default:"unknown"},
    password : {type: String, require:true },
    createdAt: { type: Date,default: Date.now}
})

 module.exports= model('users',mySchema); //this is a collection name  jabtak call nhi krenge tabtak model nhi banega

