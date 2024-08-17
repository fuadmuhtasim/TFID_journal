const pool = require('./database')

class User {
    constructor(email, password, type) {
        this.email = email;
        this.password = password;
        this.type = type;
    }
    //function to save user to database
//     async saveToDatabase() {
//         //hashes password

//         //connects to database using pool object
//         const client = await pool.connect();
//             //if cannot connect return error
//         //checks if same email already exists
//             //returns error "save email already exists"
//         //using query, and pool object, save the User to the database
//     }
//     //function to retrieve user from database
//         //hashes password
//         //connects to database using pool object
//             //if cannot connect return error
//         //checks if email and password matches
//             //returns error "email password incorrect"
//             //otherwise, if no error, updates the User details and assumes current user for 
//                 //further operations
}


module.exports = User;