const User = require('../models/user');

exports.signup = function(req,res,next){
  const email = req.body.email;
  const password = req.body.password;

  //also check here to make sure email looks like an email
  if(!email || !password){
    return res.status(422).send({error:'Email and password required'})
  }

  User.findOne({ email:email }, (err, existingUser) => {
    if(err) { return next(err); }

    if(existingUser){
      return res.status(422).send({error:'Email already exists'})
    }

    const user = new User({
      email:email,
      password:password
    });

    user.save((err)=>{
      if(err) { return next(err); }
      res.json({success: true})
    })

  });


}
