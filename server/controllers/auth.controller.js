import { errorHandler } from "../handlers/error.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user
export const Register=async (req,res,next)=>{
    const {name,email,isAdmin,isLandlord} = req.body;
    const password = await bcryptjs.hash(req.body.password, 10);
   try{
    const newUser = new User({ name, email, password,isAdmin,isLandlord });

   await newUser.save()

    res.status(201).json({message: 'User registered successfully', user: newUser});}

    catch(error){
        next(error);
   }
}

export const Login= async(req,res,next)=>{
    const {email,password} = req.body;
    try{
//verify email
        const validUser=await User.findOne({email});
        if(!validUser)
            return next(errorHandler(404, "user not found"));
//verify password
      const validPassword= bcryptjs.compareSync(password,validUser.password);
      if(!validPassword) return next(errorHandler(401,"wrong credentials"))

        //authentication
        const token=jwt.sign({id: validUser._id},process.env.JWT_SECRET)
        const {password:pass,...otherDetails}=validUser._doc;
        res.cookie("access_token",token,{httpOnly:true,expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).status(200).json({otherDetails});




    }catch(error){
        next(error);
    }
    
}
//login and register using google
export const Google= async(req,res,next)=>{
    try{
//if user exists,authenticate them
        const user=await User.findOne({email:req.body.email});
        if(user){
            const token=jwt.sign({id: user._id},process.env.JWT_SECRET)
            const {password, ...otherDetails}=user._doc;
            res.cookie("access_token",token,{httpOnly:true,expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).status(200).json({otherDetails});

        }else{ //if user doesn't exist,register them and then authenticate,give random password first
            const generatedPassword = await Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
            const newUser = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
            await newUser.save();
            const token=jwt.sign({id: newUser._id},process.env.JWT_SECRET)
            const {password, ...otherDetails}=newUser._doc;
            res.cookie("access_token",token,{httpOnly:true,expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).status(200).json({otherDetails});
        }

    }catch(error){
        next(error);
    }
}








