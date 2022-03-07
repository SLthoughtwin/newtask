function mailfunction (email,link){

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user : 'sourabhlodhi.thoughtwin@gmail.com',
        pass : "*********",
      }
    });
    const mailOption = {
      from : 'sourabhlodhi.thoughtwin@gmail.com',
      to : email,
      subject : 'testing and testing',
      text : link
    }
    
    transporter.sendMail(mailOption)
    .then((res)=>{
      // next();
      console.log('mail send successfully')
    }).catch((err)=>{
      console.log('oops! error',err)
    })
  
  
  }