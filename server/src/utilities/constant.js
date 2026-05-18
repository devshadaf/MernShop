 const PORT=process.env.PORT
 const DBUrl = process.env.DB_URL;
 const emailUser = process.env.EMAIL_USER;
 const emailPass = process.env.EMAIL_PASS;
 const JWTSecret = process.env.JWT_SECRET;

 module.exports = { PORT, DBUrl, emailUser, emailPass, JWTSecret };