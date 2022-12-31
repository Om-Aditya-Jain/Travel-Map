const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/register", async (req,res)=>{
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashpassword
        });

        const user = await newUser.save();
        res.status(200).json(user.username); 
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/", async (req,res)=>{
    try {
        const users =  await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json("Wrong Username or Password  !");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong Username or Password  !");

        res.status(200).json({_id:user._id, username:user.username});
    }catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;