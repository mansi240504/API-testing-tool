const express = require('express');
const Model=require ('../models/user_model');
const router = express.Router();


//add
router.post('/add', (req , res) =>{ 
    //router.post create a POST API
    console.log(req.body);
    new Model(req.body).save()
    //when you call new model mongoose tries to insert data into mongodb that operation is asynchronous so .save() returns a promise 
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
}); 
//if here given post then in thunder first select the option post write localhost:5000/user/add then in
//  JSON write"name:"sana khan","email":"@....",etc and send then it will run 

//getall
router.get('/getall', (req , res) =>{
    //this defines a GET route to getall
    //so when you send a GET request to http:localhost:5000/getall this code will run
    Model.find()
    //model is your mongoose model and find() fetches all the documents from that mongodb collection
    //it is asynchronous  so it returns a promise
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});
//given get so thunder first select the option get then write ex.localhost:5000/user/getall then it will run

//....................................lecture 5 
//url params=:city dene se url ke form ni aaega as in get url ke form me ata hai
//url params
router.get('/getbycity/:city',(req,res)=>{
    Model.find({city:req.params.city})
    //model.find me wo denge jo find krn hai so city chahaiye to city:req.params(this is fix).city(upar jo denge wahi yaha dete hai(city:))
    //in thunder give localhost:5000/user/getbycity/Lucknow all the data with Lucknow city will come
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

//same like city doing for email
router.get('/getbyemail/:email',(req,res)=>{
    Model.findOne({email:req.params.email})
    //find1 ek unique aur sbse pehli entry nikal kr laega aur aaray ke form me nahi object ke form me aaega 
    //for city find is good because ek city ke bhut log ho skt hai so for multiple we use find but for unique we use findOne
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

//for id same as city and email
router.get('/getbyid/:id',(req,res)=>{
    Model.findById(req.params.id)
    //upar wali line thodi different hoti in case of id 
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete
//same as upar wal sab bas yaha delete hoga
router.delete('/delete/:id',(req,res)=>{
    //or cann write like this also router.delete('/delete/:id',(req,res)=>{
    Model.findByIdAndDelete(req.params.id) 
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
//localhost:5000/user/delete:..........(id) isko send krenge to response me show hoga to wo delete ho jaega for send krne pe null aaega 
    });
});

//Now for Put (4th operation)
//Update
router.put('/update/:id',(req,res)=>{
    Model.findByIdAndUpdate(req.params.id, req.body,{new:true})
    //thunder me jab localhost:5000/user/update/68abfc3c7bfd88f17a102d30 to fir json me jakr update krenge iss id ke data 
    //ko like iss id ka name saba khan to json me denge saba danish khan send krenge to update ho jaegi magar purana he data 
    //dega with name saba khan dubara send krdne pe new data dega agar fauran new data chahiye to denge {new:true}
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
//lecture 10
router.post('/authenticate',(req,res)=>{
    const{email,password}=req.body;
    //upar line aur neeche line se email aur pw match ho ra
    Model.findOne({email,password})
    //agar email pw match hua to then chlega agar match ni hua tbbhi then chlega aur aaega null catch tb chlega jab koe unexpected error ya cheez chal jaegi
    .then((result) => {
        if(result){
            //create token
            //result me object aaega becuse hmne findone liya h jo result ko object k form m deta h 
            //to ye ek tareeqa h object m do variable de rkhe h jis ka naam de de to wo uski values de deta h to idhar result object k form m 
            //hoga to id name key dia h to neechr id aur naam aa jaega 
            const {_id,name}=result;
            jwt.sign(
                {_id,name},
            //   process.env is common aur ism jo value denge wo hide rhegi
            process.env.JWT_SECRET,
            //ek ghnte 1h k hide rhega 
            {expiresIn:'1h'},
            (err,token)=>{
                if(err){
                    console.log(err);
                    res.status(500).json(err);
                }else{
                    res.status(200).json({token});
                }
            }
            );
        }else{
            res.status(401).json({message:'Invalid credentials'});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
})
//after this install two packages=npm i dotenv jsonwebtoken and import both of them upar
module.exports =router;
