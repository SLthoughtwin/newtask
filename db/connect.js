const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/refToken-api',{
    useNewUrlParser : true,
    useUnifiedTopology :true
})
.then((d)=>{
   console.log('connection successful with database');
})
.catch((error)=>{
    console.log(error);
})