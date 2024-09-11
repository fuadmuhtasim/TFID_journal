const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const pool = require('./database/database')
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
//const signupRoute = require("./routes/signup");
// const cookieParser = require("cookie-parser");


//Serve static files from the 'public' directory using virtual "hidden" path
app.use('/hidden', express.static(path.join(__dirname, 'public')))
//To encode and decode form email data in form
app.use(express.urlencoded({ extended: true }))
//To encode and decode form email data in form
// app.use(cookieParser());

//Serve the index.html file on the root path
app.get('/', (req, res) => {
  if (req) {
    console.log('Request Received')
  } else {
    console.log('Request Error!')
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Handler: Signup Form Submission Endpoint
// app.post('/signup_form', async (req, res) => {
//   console.log('Signup Details Received')
//   // Save to database directly from here.
//   try {
//     const client = await pool.connect()
//     try {
//       const result = await client.query(
//         'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
//         [req.body.email, req.body.password]
//       )
//       res.send(`Your email and password has been recorded!`) // Return the inserted row
//     } finally {
//       client.release()
//     }
//   } catch (err) {
//     if (err.code === '23505') {
//       // Unique violation error code in PostgreSQL
//       console.error('Error: Email already exists')
//       res.status(400).json({ error: 'Email already exists' })
//     } else {
//       console.error('Database Error:', err)
//       res.status(500).send('Server Error')
//     }
//   }
// })
app.post('/signup_form', signupRoute);

//Handler: Login Form Submission Endpoint
app.post('/login_form', loginRoute);

//Listen to the port ->
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
