const express = require('express');
const Model = require('../models/user_model');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');

//add
router.post('/add', (req, res) => {
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
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});









//lecture 10
router.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
    //upar line aur neeche line se email aur pw match ho ra
    Model.findOne({ email, password })
        //agar email pw match hua to then chlega agar match ni hua tbbhi then chlega aur aaega null catch tb chlega jab koe unexpected error ya cheez chal jaegi
        .then((result) => {
            if (result) {
                //create token
                //result me object aaega becuse hmne findone liya h jo result ko object k form m deta h 
                //to ye ek tareeqa h object m do variable de rkhe h jis ka naam de de to wo uski values de deta h to idhar result object k form m 
                //hoga to id name key dia h to neechr id aur naam aa jaega 
                const { _id, name } = result;
                jwt.sign(
                    { _id, name },
                    //   process.env is common aur ism jo value denge wo hide rhegi
                    process.env.JWT_SECRET,
                    //ek ghnte 1h k hide rhega 
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token, _id, name });
                        }
                    }
                );
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
})
//after this install two packages=npm i dotenv jsonwebtoken and import both of them upar
module.exports = router;
