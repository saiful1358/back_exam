
import UserModel from "../model/UserModel.js"
import { TokenEncode } from "../utility/tokenUtility.js";
import SendEmail from "../utility/emailUtility.js";
import userModel from "../model/UserModel.js";



export const Registration =async(req, res) => {

    try{

        let reqBody = req.body;
        await UserModel.create(reqBody)

        return res.json({status:"sucess","Message":"User Registration Sucessfully"})



    }catch(err){
        return res.json({status:"fail","Message":err.toString()})

    }

   

}

export const Login =async(req, res) => {

    try {
        let reqBody=req.body;
        let data=await UserModel.findOne(reqBody)
        if(data===null){
            return res.json({status:"fail","Message":"User not found"})
        }
        else {
            // Login Success Token Encode
            let token=TokenEncode(data['email'],data['_id'])
            res.cookie('token', token, {
                httpOnly: true, // Prevents JavaScript access on the client-side
                secure: process.env.NODE_ENV === 'production', // Secure in production
                maxAge: 3600000 // Cookie expiry in milliseconds (1 hour)
            });
            return res.json({status:"success",Token:token,"Message":"User Login successfully"})


        }



    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}

export const ProfileDetails =async(req, res) => {

    try {
       
        let user_id=req.headers['user_id'];
       
        let data=await UserModel.findOne({"_id":user_id})
        return res.json({status:"success","Message":"User ProfileDetails successfully",data:data})
        
    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }

   

   

}

export const ProfileUpdate =async(req, res) => {

    try{

        let reqBody=req.body;
        let user_id=req.headers['user_id'];

        await UserModel.updateOne({"_id":user_id},reqBody)
        return res.json({status:"success","Message":"User Update successfully"})

    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }


}

export const EmailVarify =async(req, res) => {

   try{
    let email = req.params.email;
    let data = await UserModel.findOne({email: email})
    if(data==null){
        return res.json({status:"fail","Message":"User Email Dose Not Exist"})
    }else{
        let code = Math.floor(100000+Math.random()*900000)
        let Emailto = data['email'];
        let EmailTax = "Your Code is" +code;
        let EmailSubject = "TaskManager Verification Code"
        await SendEmail(Emailto, EmailTax, EmailSubject)

        await UserModel.updateOne({email: email},{otp:code})
        return res.json({status:"success",Message:"Verification Sucessful, Check Email"})
    }
   }catch(err){
    return res.json({status:"fail","Message":err.toString()})
    }

    
}


export const getAllUsers  = async (req, res) => {
        try {

            const users = await userModel.find();
            res.status(200).json(users);
        } catch (error) {
            return res.json(
                {
                    status:"fail","Message":error.toString()
                })
        }

};

export const getSingleUsers  = async (req, res) => {
    const {id} = req.params;
    try {

        const singleUsers = await userModel.findOne({_id:id})
        res.status(200).send(singleUsers);
    } catch (error) {
        return res.json(
            {
                status:"fail","Message":error.toString()
            })
    }

};

export const deleteSingleUsers  = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {

        res.status(500).json({ message: 'Failed to delete user' });
    }

};

export const CodeVarify =async(req, res) => {
    return res.json({status:"sucess","Message":"User CodeVerify Sucessfully"})

}

export const ReseatPassword =async(req, res) => {
    return res.json({status:"sucess","Message":"User ReseatPassword Sucessfully"})

}