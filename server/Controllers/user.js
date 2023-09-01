const sql = require('mssql')
const config =require('../Config/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = '@2G4#Y7!t0z2$4S6&8*01P3KA%7BN1X3'

exports.read = async(req,res)=>{
    try{
        res.send('Hello Read')
    }catch(e){
        console.log(e)
        res.status(500).send('Server Error')
    }
    
}
exports.list = async (req, res) => {
    try {
        const pool = await sql.connect(config); // Replace 'config' with your SQL Server connection configuration
        
        const result = await pool.request().query('SELECT * FROM tb_account');
        const userList = result.recordset;
        console.log('User List:', userList);
        res.json(userList);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
}
exports.register = async(req,res)=>{
    try {
        const pool = await sql.connect(config);
        // Hash the password
         const salt = await bcrypt.genSalt(saltRounds);
         const hash = await bcrypt.hash(req.body.password, salt);

        // Perform the INSERT operation
        const result = await pool
            .request()
            .input('username', sql.VarChar, req.body.username)
            .input('email', sql.VarChar, req.body.email)
            .input('password', sql.Text, hash)
            .input('fname', sql.VarChar, req.body.fname)
            .input('lname', sql.VarChar, req.body.lname)
            .query('INSERT INTO tb_account (username,email, password, fname, lname) VALUES (@username,@email, @password, @fname, @lname)');
        
        sql.close(); // Close the connection
        const userCreate = result.recordset;
        // Send a response
        //res.json({ status: 'ok' });
        res.send(userCreate)

    } catch (error) {
        console.log('Error inserting data:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
    
}
exports.login =async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(config);

        // Retrieve user's record by email
        const result = await pool
            .request()
            .input('username', sql.VarChar, req.body.username)
            .query('SELECT password FROM tb_account WHERE username = @username');

        if (result.recordset.length === 0) {
            // No user found with the given username
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const hashedPasswordFromDB = result.recordset[0].password;

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(req.body.password, hashedPasswordFromDB);

        if (!passwordMatch) {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        var token = jwt.sign({ username: req.body.username }, secret,{ expiresIn: '1h' });
        // Passwords match, user is authenticated
        res.json({status:'ok',token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

exports.updated = async(req,res)=>{
    try{
        res.send('Hello Update')
    }catch(e){
        console.log(e)
        res.status(500).send('Server Error')
    }
    
}
exports.deleted = async(req,res)=>{
    try{
        res.send('Hello Delete')
    }catch(e){
        console.log(e)
        res.status(500).send('Server Error')
    }
    
}