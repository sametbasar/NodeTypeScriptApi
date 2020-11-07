// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db = {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
};

export const logDirectory = process.env.LOG_DIR;

export const corsUrl = process.env.CORS_URL;

export const jwtKey = process.env.JWT_KEY;
