const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
     designation:{
        type:String,
        required:false
    },
   
    gender:{
        type:String,
        required:false
    },
    birthday:{
        type:Date,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    resetLink:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

module.exports=mongoose.model("User",userSchema)
