const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bycrypt = require('bcryptjs');
require('dotenv').config()
const crypto = require('crypto') 


module.exports = {
 
    signUpValidation: (req, res, next) => {
    const validateUser = (user) => {
      const JoiSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().required(),
        password_confirmation: Joi.ref("password"),
      })
      return JoiSchema.validate(user);
    };

    const response = validateUser(req.body);
    if (response.error) {
      res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
  },

  loginValidation: (req, res, next) => {
    const loginUser = (user) => {
      const JoiSchema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      }).options({ abortEarly: false });
      return JoiSchema.validate(user);
    };
    const response = loginUser(req.body);
    if (response.error) {
      res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
  },

  accessTokenVarify: (req, res, next) => {
    // const token = req.headers.authorization;
    const token = req.params.token
    if (!token) {
      return res.status(400).json({
        message: "A token is required for authentication",
        status: 400,
        success: false,
      });
    } else {
      // const authHeader = req.headers.authorization;
      // const bearerToken = authHeader.split(" ");
      // const token = bearerToken[1];
      jwt.verify(
        token,process.env.ACCESS_TOKEN,
        (error, payload) => {
          if (error) {
            res.status(400).json({
              message: "invalid token",
              status: 400,
              success: false,
            });
          } else {
            next();
          }
        }
      );
    }
  },

  refreshTokenVarify: (refreshVarify) => {
    const token = refreshVarify;
    if (!token) {
      return {message: "A token is required for authentication"}
     }
     else {
      const token = refreshVarify;
      const paylod = jwt.verify(token, process.env.REFRESH_TOKEN, (error, payload) => 
      {
          if(payload){
           return payload;
          }else{
            return {message: error}
          }
      });

      return paylod
    }
  },

  accessToken:(userId)=>{
    const userid = userId
    return new Promise ((resolve,reject)=> {
        const options = {
            expiresIn: "1h",
            issuer: 'sourabh@gmail.com',
            audience: userid
        };
      const paylod = {};
        jwt.sign(paylod, process.env.ACCESS_TOKEN,  options,(err, token) => {
            if (err) {
                reject({message: 'Invalid operation!'});
            } else {
                resolve(token);
            }
        })
    });
},

refreshToken:(userId)=>{
  const userid = userId
  return new Promise ((resolve,reject)=> {
      const options = {
          expiresIn: "1d",
          issuer: 'sourabh@gmail.com',
          audience: userid
      };
      const paylod = {};
      jwt.sign(paylod, process.env.REFRESH_TOKEN,  options,(err, token) => {
          if (err) {
              reject({message: 'Invalid operation!'});
          } else {
              resolve(token);
          }
      })
  });
},

bcryptPassword:async(password)=>{
  const pass = await bycrypt.hash(password,10)
  return pass;
},
bcryptPasswordMatch:async(user_pass,db_pass)=>{
  const matchpass = await bycrypt.compare(user_pass,db_pass)
  return matchpass;
},

crypto_string: ()=>{
  return  crypto.createHash('sha256')
  .update('this is  node!')
  .digest('hex');
},


};