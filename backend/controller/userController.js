const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel, emailConfModel } = require("../models/User");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ND_EMAIL,
      pass: process.env.ND_PASSWORD,
    },
  });

function generateAuthCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

async function confirm(req, res) {
    const { email, code } = req.body;
    const emailConf = await emailConfModel.find({email: email}, {code:1, _id:0});
    console.log(emailConf[0].code);
    console.log(code);
    console.log(emailConf[0].code == code)
    if (emailConf[0].code != code) {
        res.sendStatus(201);
    } else {
        const user = await userModel.updateOne({email: email}, {$set: {active: true}});
        res.sendStatus(200);
    }
}

function register(req, res) {
    const { email, password, firstName, lastName, birthday } = req.body;
    console.log(email, password);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
        try {
            const user = await userModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash,
            birthday: birthday,
            active: false,
            });
            const authCode = generateAuthCode();
            const emailConf = await emailConfModel.create({
            email: email,
            code: authCode,
            });
            res.sendStatus(200);
            const info = await transporter.sendMail({
            from: `<${process.env.ND_EMAIL}>`,
            to: `${email}`,
            subject: "Account activation",
            text: `Hello ${firstName} your activation code is: ${authCode}`,
            html: `<b>Hello ${firstName} your activation code is: ${authCode}</b>`,
            });
            console.log(info);
        } catch (err) {
            if (err) throw err;
        }
        });
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne( {email: email } );
    if (!user) {
        return res.status(204).send({
            message: "User does not exist",
        })
    }
    bcrypt.compare( password, user.password, ( err, result ) => {
        if (result) {
            const authToken = jwt.sign( {userID: user.id ,name: user.firstName}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'None', secure: true }).status(200).json({
                    email: email,
                    firstName: user.firstName,
                    userID: user._id,
                })
            } )

        } else {
            return res.status(204).send({
                message: "Wrong password",
            })
        }
    } )

}

module.exports = {
    confirm,
    register,
    login,
}
