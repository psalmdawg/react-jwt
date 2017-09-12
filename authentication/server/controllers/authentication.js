const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret) //sub = jwt is a convetion. sub = subject.
}

exports.signin = function(req, res, next){
  res.send({token: tokenForUser(req,res)})
}

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
      res.json({token: tokenForUser(user) })
    })

  });

}
