const express=require('express')
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');
const JWT_SECRET='Bhawnaisagoodgirl';


//ROUTE 1: create a user using POST: /api/auth/createUser  Don't require No login required
router.post('/createUser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be of atleast 5 characters ').isLength({ min: 5 })
],async (req,res)=>{
  let success=false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      //check whether the user with this email exists already
      try{
        let user=await User.findOne({email: req.body.email});
        if(user)
        {
            return res.status(400).json({success,error: "Sorry, a user with this email already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        secPass=await bcrypt.hash(req.body.password,salt);
        //create a new user
       user=await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
      //   .then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      // res.json({error:'Please enter a unique value for email',message: err.message})})
      const data={
        user:{id:user.id}
      }
      const authtoken=jwt.sign(data,JWT_SECRET)
      success=true;
      res.json({success,authtoken});
      console.log(json);
      }
      catch(error){
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
    
})

//ROUTE 2:Authenticate a user using POST "/api/auth/login": No login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
  
],async (req,res)=>{
  let success=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email,password}=req.body;
      try{
        let user =await User.findOne({email});
        if(!user){
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const data={
          user:{id:user.id}
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
      }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
});

//ROUTE 3: Get logged in user details using : post "/api/auth/getuser": login required
router.post('/getuser',fetchUser,async (req,res)=>{
try{
  userId=req.user.id;
  const user=await User.findById(userId).select("-password");
  res.send(user);
}catch(error)
{
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})

module.exports=router