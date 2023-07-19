
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next( new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const {name, email, password} = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }

    if (existingUser) {
      const error = new HttpError(
        "User exists already, please login instead.",
        422
      );
      return next(error);
    }

    const newPassword = await bcrypt.hash(req.body.password, 10)

    const createdUser = new User({
        name,
        email,
        password: newPassword,
        tasks: []
    });

    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError("Signing up failed, please try again.", 500);
      return next(error);
    }

    res.json({ status: 'ok' });
    //res.status(201).json({ user: createdUser.toObject({ getters: true }) });

    };

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  const isPasswordValid = await bcrypt.compare(
		req.body.password,
		existingUser.password
	)

  if (isPasswordValid) {
		const CreatedToken = jwt.sign(
			{
				email: existingUser.email,
			},
			'secret123'
		)
    console.log("logged in")
    return res.json({ status: 'ok', token: CreatedToken, userid: existingUser._id, username:existingUser.name });
  }
    else{
      return res.json({ status: 'error', user: false })
    }

  console.log("logged in")
  res.json({ message: "Logged In" });
  //res.console.log("logged in")
};

exports.register = register;
exports.login = login;