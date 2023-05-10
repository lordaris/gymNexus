require('dotenv').config()


const config = {
    mongo: {
        url: process.env.MONGO_URI,
        connectionOptions: {}
    },
    jwt_secret: process.env.JWT_SECRET
}

exports.config = config