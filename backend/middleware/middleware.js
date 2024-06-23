const jwt = require('jsonwebtoken');

async function authenticate(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) throw err;
                resolve(user);
            })
        } else {
            reject('no token');
        }

    })
}

module.exports = {
    authenticate
}