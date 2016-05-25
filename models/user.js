var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var moment = require("moment");
var Schema = mongoose.Schema;
const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}

var userSchema = new mongoose.Schema({

	email: { type: String, required: true, unique: true },
	password: { type: String, required: true},
	reviews: [{
		type: Schema.Types.ObjectId, ref: 'Review'
	}]

});

//middleware
userSchema.statics.register = function(userObj, cb) {
	//check if email exists in db
	//hash pw
	//save user
	console.log(userObj);
	var email = userObj.email;
	var password = userObj.password;

	//check if email exists in db
	User.findOne({ email: email }, function (err, user) {
		if(err){ cb(err) }
		if(user){
			cb("User email already exists");
			return;
		}

		//hash pw
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);

		//save user
		var user = new User({
			email: email,
			password: hash,
			reviews: []
		});

		console.log("user", user);

		user.save(cb);
		
	});
};

userSchema.statics.login = function(userObj, cb) {
	//retrieve user from db
	//compare pw
	//if pw match, create token

	this.findOne({ email: userObj.email }, function (err, user) {
		if(err || !user) return cb(err || { error: 'Login failed. Username or password incorrect.' });

		bcrypt.compare(userObj.password, user.password, (err, isGood) => {
      		if(err || !isGood) return cb(err || { error: 'Login failed. Username or password incorrect.' });
      		var token = user.makeToken();
      		cb(null, token);
      	});
	});
};

userSchema.statics.isLoggedIn = function(req, res, next) {
  var token = req.cookies.accessToken;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).send({error: 'Must be authenticated.'});

    User
      .findById(payload._id)
      .populate("reviews")
      .select({password: false})
      .exec((err, user) => {
        if(err || !user) {
          return res.clearCookie('accessToken').status(400).send(err || {error: 'User not found.'});
        }

        req.user = user;
        console.log(user);
        next();
      });
  });
};


userSchema.methods.makeToken = function() {
  var token = jwt.sign({
    _id: this._id,
    exp: moment().add(1, 'day').unix() // in seconds
  }, JWT_SECRET);
  return token;
};

userSchema.statics.getAll = function(cb) {
	User.find({})
		.populate("reviews")
		.exec(function (err, users) {
		if(err){ cb (err) }
		cb(null, users);
	});
}

var User = mongoose.model("User", userSchema);
module.exports = User;

























