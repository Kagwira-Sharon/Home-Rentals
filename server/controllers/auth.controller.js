import { errorHandler } from "../handlers/error.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

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

export const Login=(req,res)=>{
    const {email,password} = req.body;

}