const express = require('express');
const router = new express.Router();
const { signUpValidation, loginValidation, accessTokenVarify} = require('../validation/validate')
const controller = require('../controller/controller')

/**
 * @swagger
 * /signUp:
 *   post:
 *     summary: create a new user
 *     tags: [user_signup]
 *     requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *                required:
 *                   - name
 *                   - email
 *                   - password
 *                   - password_confirmation
 *                properties:
 *                   name:
 *                      type:string
 *                   email:
 *                      type: email
 *                   password:
 *                      type:password
 *                   password_confirmation:
 *                      type: password
 *                example:
 *                   name: sourabh
 *                   email: sourabh@gmail.com
 *                   password: "1234"
 *                   password_confirmation: "1234"
 *            
 *     responses:
 *       200:
 *         description: signup successfully 
 *     
 * 
 * 
 */
 router.post("/signUp",signUpValidation,controller.signUPUser);

/**
 * @swagger
 *  /getToken/{token}:
 *     get:
 *      summary: getToken form url 
 *      tags: [getToken]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            token:
 *              type: string
 *      responses:
 *       200:
 *         description: The list of the books
 */

 router.get('/getToken/:token',controller.isVerified)


 /**
 * @swagger
 *  /login:
 *     post:
 *      summary: login user
 *      tags: [user_login]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                required:
 *                   - email
 *                   - password
 *                properties:
 *                   email:
 *                     type: email
 *                   password: 
 *                     type: password
 *      responses:
 *           200:
 *              description: login successfully
 *                
 * 
 */
 router.post("/login",loginValidation,controller.loginUser);


 /**
 * @swagger
 *  /refreshtoken:
 *    post:
 *      summary: create new token for user
 *      tags: [refreshtoken]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                required:
 *                   - token
 *                properties:
 *                   token:
 *                     type: string
 *      responses:
 *           200:
 *              description: login successfully
 *                
 * 
 */

 router.post('/refreshtoken',controller.refreshToken)
 


module.exports = router;
