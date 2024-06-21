const dotenv = require('dotenv');

if(process.env.NODE_ENV !== 'production')
    dotenv.configDotenv();

const port = process.env.PORT || 8000;
const mongodb_url = process.env.MONGODB_URL;

module.exports = {port,mongodb_url};