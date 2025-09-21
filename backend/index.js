const express = require('express');
const app = express();
const User_router= require('./routers/user_router');
const requestrouter=require('./routers/requestrouter')

const cors =require('cors');
const port = 5000;  // port kuch bhi de skte hai but kuch port jyada use ki jaate hai

//middleware
app.use(cors({
    origin:['http://localhost:3000']
}));
app.use(express.json());
app.use("/user",User_router);
app.use("/api",requestrouter);

//endpoint 
app.post('/add', (req, res) => {
    console.log('saved Request:',req.body);
    res.send("response from express")
});

app.get('/get', (req, res) => {
    res.send("response from add")
});
app.get('/getall', (req, res) => {
    res.send("response from getall")
});
app.get('/delete', (req, res) => {
    res.send("response from  delete")
});
//starting the server 
app.listen(port, () => {
    console.log('server started ');
});