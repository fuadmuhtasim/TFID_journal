const path = require('path');
const pool = require('../database/database');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//This async function is exported to handle login requests
//it gets a client thread to work with a database and to query it
module.exports = async (req, res) => {
  if (req) {
    console.log('Login Details Received')
  } else {
    console.log('Login Form Error!')
  }
  //Querying the database for email and password
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [req.body.email, req.body.password]
      )
      // If Email and password match, console.log(Match found) ->
      if (result.rows.length > 0) {
        console.log('User found.', result.rows[0])
          //-> create a jwt token, sign it ->
          const token = jwt.sign({userId: result.rows[0].id}, process.env.MY_SECRET, {expiresIn: "1h"});
          //-> responds with a cookie saved into the browser called token
          res.cookie("token", token,{
            httpOnly: true
          });
        // Also sends the landing page file as a response
        res.sendFile(path.join(__dirname, '../public', 'landingpage.html'));
      } else {
        // returns no match found
        console.log('Invalid email or password')
        res.send('User Not Found!')
      }
    } catch (err) {
      console.error('Error executing query:', err)
      res.status(500).send('Error processing your request')
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Error in Database connection:', err) // Corrected to `err`
    res.status(500).send('Database connection failed')
  }

};