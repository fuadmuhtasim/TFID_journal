const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(cookieParser());

exports.cookieJwtAuth = (req,res,next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        //can access the user id here
        req.user = user;
        next();
    } catch (err) {
        //clears the cookie
        res.clearCookie("token");
        return res.redirect("/");
    }
};