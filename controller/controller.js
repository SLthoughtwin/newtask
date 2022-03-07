const User = require('../model/model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment')
const {accessToken,refreshToken,refreshTokenVarify,crypto_string} = require('../validation/validate')
    exports.signUPUser = async(req,res)=>{
        try{
            const user = new User(req.body)
            const currentTime =  new Date().toLocaleString();
            const reset_token =  crypto_string();
            user.resetToken = reset_token;
            user.currentTime = currentTime;
            const createuser = await user.save(user);
            res.status(201).json({
                user: createuser,
                message: "signUP successfully :)"
            })
        }catch(error){
           res.status(400).send(error);
        }
       
    }

    exports.isVerified = async(req,res)=>{
        const token =  req.params.token
        const result = await User.findOne({ resetToken: token});
       console.log("======>",result.createdAt.toLocaleString())
        console.log((parseInt(new Date().toLocaleString())));
        if(!result){
            return res.status(404).send("invalid user")
        }
       
        if(token === result.resetToken){
            const editResult = await User.updateOne({id:result._id},{isVerified:true})
            res.send(editResult);
        }else{
            return res.status(400).send("invalid token")
        }

    }
  
    exports.loginUser = async (req, res) => {
        const result = await User.findOne({ email: req.body.email });
        if(!result){
           return res.status(400).send("invalid user")
        }
        if(result.isVerified === true ){
            const db_pass = result.password;
            const user_pass = req.body.password;
            if(db_pass === user_pass){
                const userId = result.id
                const access_Token = await accessToken(userId)
                const refresh_Token =  await refreshToken(userId);
                res.status(200).json({
                    accessToken: access_Token,
                    refreshToken: refresh_Token,
                    message: 'login successfully'
                })
            }else{
                return res.send('invalid login details') 
            }
        }else{
           return res.send('first veryfied then login :)')
        }
       
    }

    exports.refreshToken = async(req,res)=>{
        const refreshVarify = req.body.token;
        const paylod = refreshTokenVarify(refreshVarify)
        if(!paylod){
         return res.status(400).send("invalid user")
        }
        const userId = paylod.aud;
        if(!userId){
            return res.status(400).json({
                success:false,
                message: "user not authenticated"
            })
        }
        const userToken = await User.findOne({id:userId})
        if(!userToken){
            return res.status(400).json({
                success:false,
                message: "invalid user"
            })
        }else{
            const access_Token = await accessToken(userId)
            const refresh_Token =  await refreshToken(userId);
           return res.status(400).json({accesstoken:access_Token,refrestToken:refresh_Token});
        }
        

    }


