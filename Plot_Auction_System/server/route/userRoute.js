
const express = require('express');
const router = express.Router();
const db= require('../config/database')
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')


router.post('/login', async (req, res) => {
    try {
    const { username, password } = req.body;
  
    // Access the users collection
    const collection = await db.getCollection('users');
  
   const accessToken=jwt.sign({username,password},process.env.ACCESS_TOKEN_SECRET)
      // Find the user with the provided username
      const user = await collection.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored password hash
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      res.status(200).json({username:username ,accessToken:accessToken,message: 'Login successful' });
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  


  router.post('/register',async (req, res) => {
  try {
    console.log(req.body, "Register API");
    const  username  = req.body?.username ;
    const password =req.body?.password 
    // Access the users collection
    const collection = await db.getCollection('users');

    // Check if the username already exists
    const existingUser = await collection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = { username, password: hashedPassword };

    // Insert the new user into the database
    await collection.insertOne(newUser);

    return res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
  });









module.exports = router