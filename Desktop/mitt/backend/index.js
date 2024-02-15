const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("./models/User")
const cookieParser = require('cookie-parser');

const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/employee");
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});


app.post("/register", async (req,res) => {
    
    try{
        const { name, email, password } = req.body;
        const myencpassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password: myencpassword
        })

        const token = jwt.sign(
            {id: user._id},
            'shhh',
            {
                expiresIn: "2h"
            }
        );
        user.token = token
        user.password = undefined

        res.status(200).json({ token })

    }catch(error){

        console.log(error)
    }



});


app.post("/login", async (req, res) => {
    try{
        const {email,password} =req.body;

        const user =await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {id: user._id},
                'shhh',
            {
                expiresIn: "2h"
            }
            );

            res.cookie(
                'token', 
                token, 
                { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }
            );

            user.token=token
            user.password = undefined

            res.status(200).json({ token });

        }else{
            res.status(401).json({msg: "invalid credentials!"});
        }


    }catch(error){
        console.log(error);
        res.status(401).json({ error: "Invalid email or password" });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie('token'); // Clear token cookie
    res.status(200).json({ message: "Logout successful" });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


