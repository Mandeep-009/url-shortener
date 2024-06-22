import { configDotenv } from "dotenv";

if(process.env.NODE_ENV !== 'production')
    configDotenv();

export const port = process.env.PORT || 8000;
export const mongodb_url = process.env.MONGODB_URL;
