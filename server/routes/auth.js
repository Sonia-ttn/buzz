const router = require("express").Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//verify if token that logged in with user is same or not

const { OAuth2Client } = require('google-auth-library');

const {CLIENT_ID}=require('../keys')


const {JWT_SECRET_KEY}=require('../keys')
const {CLIENT_URL}=require('../keys')
const {API_KEY}=require('../keys')
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox18eab7e802c5422b842a53cf59150e22.mailgun.org';
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});


const client=new OAuth2Client(CLIENT_ID);
const verify=require('../middleware/verify')

router.get('/verify',verify,(req,res)=>{
  res.send('Hello User')
})

router.post("/signup", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //destructuring values received from  front end
  const { firstname,lastname, email, password,designation,city,regions,birthday,gender } = req.body;
 

  if (!validatedomain(email))
    return res.status(400).json({ msg: "Invalid Domain" });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Already Exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    designation:req.body.designation,
    city:req.body.city,
    regions:req.body.regions,
    birthday:req.body.birthday,
    gender:req.body.gender
  });

  try {
    const savedUser = await user.save();
    res.json({ message: "Register Sucessfully" });
  } catch (error) {
    res.status(400).send(error,"In server");
  }
}); 

router.post("/signin", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email not exist
  const user = await User.findOne({ email: req.body.email });

  
  if (!user) return res.status(400).send("Email doesn't Exist");
  

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Inavlid Email or Password ");

  const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);
 
  const {_id,firstname,lastname,email,isAdmin}=user
 // res.json({data:token,user:{_id,firstname,lastname,email}})
  res.send({token,user:{_id,firstname,lastname,email,isAdmin}})
 //const user1={_id,firstname,lastname,email}
  //res.status(200).send({ data: token ,message: "logged in successfully" });
 //res.header("auth-token", token).send(token);
  

 // return res.status(200).send({message:"Successfully Signed In"})
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//googlelogin
router.post('/googlelogin',(req,response)=>{
  //tokenid received from client end
 const {tokenId}=req.body;
 //verify token from client and backend
  client.verifyIdToken({idToken:tokenId,audience:CLIENT_ID})
  .then(res=>{
    const {given_name,family_name,email,email_verified}=res.payload;
   console.log("**",email);
   //console.log(email_verified);
   //console.log(res.payload);
  
    if(email_verified){
      //return res.status(400).send({error:"something wrong"});
      //const temp=
      User.findOne({"email":email}).exec((err,user)=>{
        if(err){
           return response.status(400).send({error:"something wrong"});
          }
        else{
          if(user){
             //console.log("**",user);
              const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);
              console.log("token",token);
              const {_id,firstname,lastname,email}=user;
              console.log(user);
              
                //console.log({token,user:{_id,firstname,lastname,email}});
  
              //sending res to client
              console.log("hi exis user");
              //return user
              
              //return response.json({token,firstname,lastname,email});
                return response.json({token,user:{_id,firstname,lastname,email}})
          
          }
          else{
              bcrypt.hash(email,10)
              .then((hashpasswordd)=>{
                console.log(hashpasswordd)
                let newUser=new User({firstname:given_name,lastname:family_name,email,password:hashpasswordd});
              console.log(newUser);
               //saving in db
              newUser.save((err,data)=>{
                if(err){
                  return response.status(400).send({
                    error:"try again"
                  })
                }
              
   
                const token = jwt.sign({ _id: data._id }, JWT_SECRET_KEY);
                console.log(token);
 
                const {_id,
                 firstname,lastname,email}=newUser;
                 console.log(" hii new user!!")
 
               //sending res to client
                //return res.json({token,user:{_id,firstname,lastname,email}})
                return response.json({token,user:{_id,firstname,lastname,email}})
                //return response.json({token,firstname,lastname,email});

               })
              })

              .catch(err=>{
                console.log("error",err);
              })

            
            
           
          }
      }
  })
 
  }
  else {
    console.log("email verif failed!!")
    return response.status(400).send(
      'Google login failed. Try again'
    );
  }
})
.catch((error)=>{
  response.status(500).send({ message: "Token Verification failed" });
})
})



router.get("/getallusers", verify,async(req, res) => {
  try {
      const users = await User.find()
      res.send(users)
  } catch (error) {
      console.log(error)
      return res.status(400).json(error);
  }
});

router.get('/user/:id',verify,(req,res)=>{
  User.findOne({_id:req.params.id})
  .select("-password")
  .then(user=>{
       Post.find({postedBy:req.params.id})
       .populate("postedBy","_id name")
       .exec((err,posts)=>{
           if(err){
               return res.status(422).json({error:err})
           }
           res.json({user,posts})
       })
  }).catch(err=>{
      return res.status(404).json({error:"User not found"})
  })
})

//forgot password
router.put('/forgot-password',(req,res)=>{
   const {email}=req.body;
   User.findOne({email},(err,user)=>{
     if(err || !user){
       return res.status(400).json({error:
      "user doesn't exists with this emailid"});
     }
     const token =jwt.sign({_id:user._id},JWT_SECRET_KEY);
     console.log("Token for resetting password",token);
     const data={
        from :"noreply@ttn.com",
        to:email,
        subject:"Password reset link",
        html:`
        <h2>Please click on this link to reset password</h2>
        <p>${CLIENT_URL}/reset/${token}</p>`

     };
     return user.updateOne({resetLink:token},(err,succ)=>{
      if(err){
        return res.status(400).json({error:"reset password link error"});
      }

      else{
        mg.messages().send(data,function(error,body){
         if(error){
        return res.json({
          error:error.message
       })
      }
      
       return res.json({message:"email sent"}
     );
      
 });
}
     })
   })
})

//reset-password
router.put('/resetpassword',(req,res)=>{
  
//link from client side
  const {resetLink,newPassword}=req.body;

  if(resetLink){
    jwt.verify(resetLink,JWT_SECRET_KEY,(error,data)=>{
      if(error){
        return res.status(401).json({error:"Incorrect token"
      })
      }
    User.findOne({resetLink},(err,user)=>{
      if(err || !user){
        return res.status(400).json({error:"user doesn't exists with this token"});
      } 
     
      bcrypt.hash(newPassword,10)
      .then(hashpassword=>{
        const obj={
          password:hashpassword,
          resetLink:""
          }
          //extends prop will update the obj in db
          user=_.extend(user,obj);
          user.save((err,result)=>{
              if(err){
                return res.status(400).json({error:"could not save!!reset password error"});
              }  
    
              else{
         
                return res.status(200).json({message:"password changed"});
    
                }
            })
      })
      .catch(err=>{
        console.log("error",err);
      })

      
      })
    })
  }
  else{
    return res.status(401).json({error:"Authentication error!!!"});
  }
});

router.post("/deleteuser",verify,async(req,res)=>{
  
  const {userId}=req.body
  try {
     await User.find({_id:userId}).remove()
     res.send('User Deleted Successfully');
  } catch (error) {
    return res.status(400).json({message: error})
  }
  })

router.put("/editpro",verify,async(req,res)=>{
  try{
    const user= await User.findById(req.user._id)
   if(user){
     user.firstname=req.body.firstname ||user.firstname
     user.lastname=req.body.lastname || user.lastname
     user.designation=req.body.designation||user.designation
     user.gender=req.body.gender||user.gender
     user.birthday=req.body.birthday||user.birthday
     user.city=req.body.city||user.city
     user.state=req.body.state||user.state

     const updateUser=await user.save()
     //console.log("dd")
     res.json({
       _id:user._id,
       firstname:updateUser.firstname,
       lastname:updateUser.lastname,
       email:updateUser.email,
       designation:updateUser.designation,
       gender:updateUser.gender,
       birthday:updateUser.birthday,
       city:updateUser.city,
       state:updateUser.state,
       

     })
   }
  }
  catch (error) {
    console.log(error)
    return res.status(400).json(error);
}
})

function validatedomain(email) {
  const allowedEmailDomain = "tothenew.com";
  if (email.split("@")[1] === allowedEmailDomain) {
    return true;
  } else {
    return false;
  }
}

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(6).required(),
    lastname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    designation:Joi.string().min(6).required(),
    gender:Joi.string().min(4).required(),
    birthday:Joi.date().raw().required(),
    city:Joi.string().min(4).required(),
    regions:Joi.string().min(4).required(),

  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

router.get("/followersfollowing", verify,async(req, res) => {
  try {
      const userinfo = await User.find({_id:req.user._id})
      console.log(userinfo)
      res.send(userinfo)
  } catch (error) {
      console.log(error)
      return res.status(400).json(error);
  }
});

module.exports = router;
