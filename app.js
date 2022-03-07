const express = require('express');
const router = require('./routes/route')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
const { date } = require('joi');
require('./db/connect')

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Demo API",
			version: "1.0.0",
			description: "A simple Demo API",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: ["./routes/route.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// const date1 =  new Date()
// console.log(date1.getHours());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/',router)

app.listen(8080,()=>{
    console.log(`http://localhost:8080/api-docs/`);
})


