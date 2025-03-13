const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        requires:true,
        trim: true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        match: [/.+\@.+\..+/, "PLease enter a valid email address"],
    },
    password:{
        type:String,
        required: true,
        minlenght : 6,
    },
    role:{
        type: String,
        enum: ["customer", "admin"],
        default:"customer",
    }
},
{timestamps:true}
)

// Password hash middleware
userSchema.pre("save" , async function (next) {
        if(!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
        next();
})

//Match User password  to hashed Password
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

module.exports = mongoose.model("User", userSchema)