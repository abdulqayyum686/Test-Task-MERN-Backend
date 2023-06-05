const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const saltRounds = 10;

module.exports.userLogin = (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;
  userSchema
    .findOne({ email: email })
    .exec()
    .then(async (foundObject) => {
      if (foundObject) {
        await bcrypt.compare(
          password,
          foundObject.password,
          async (err, newResult) => {
            if (err) {
              return res.status(501).json({ err, err });
            } else {
              if (newResult) {
                const token = jwt.sign(
                  { ...foundObject.toObject(), password: "" },
                  "secret",
                  {
                    expiresIn: "5d",
                  }
                );

                return res.status(200).json({
                  token: token,
                  message: "Login successfully",
                  user: foundObject,
                });
              } else {
                return res.status(401).json({
                  message: "invalid password",
                  action: false,
                });
              }
            }
          }
        );
      } else {
        return res.status(404).json({
          message: "Opps invalid email",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
module.exports.userSignup = (req, res, next) => {
  console.log("==>>>responce sigup>>", req.body);
  const { email, password } = req.body;

  userSchema
    .findOne({ email: email })
    .exec()
    .then(async (foundObject) => {
      if (foundObject) {
        return res.status(403).json({
          message: "Opps this email/user name already exist!",
        });
      } else {
        await bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(" error: ", err);
            return res.status(500).json({ err: err });
          } else {
            let newUser = new userSchema({
              email: email,
              password: hash,
            });

            newUser
              .save()
              .then(async (savedObject) => {
                console.log("savedObject", savedObject);
                sendEmail(savedObject.email, "Welcome Note", password);
                return res.status(201).json({
                  message: "user signup successful",
                  user: savedObject,
                });
              })
              .catch((err) => {
                console.log("Not saved", err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
exports.getCurrentUser = async (req, res) => {
  try {
    let data = await userSchema.findById({ _id: req.params.id });

    res.status(200).json({
      user: data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json(err);
  }
};
