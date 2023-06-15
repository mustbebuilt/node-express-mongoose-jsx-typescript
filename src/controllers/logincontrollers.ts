import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User, IUser } from '../models/User';

async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // res.status(400).json({ error: 'User already exists' });
      res.render('register', { title: "Register", error: 'User already exists', loggedIn: false });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // res.status(201).json({ message: 'User created successfully' });
    res.redirect('/login');
  } catch (error) {
    console.error('Error creating user:', error);
    // res.status(500).json({ error: 'Failed to create user' });
    res.render('register', { title: "Register", error: 'Failed to create user', loggedIn: false });
  }
}

async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // res.status(401).json({ error: 'Invalid email or password' });
      res.render('login', { title: "Login", error: 'Invalid email or password', loggedIn: false });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // res.status(401).json({ error: 'Invalid email or password' });
      res.render('login', { title: "Login", error: 'Invalid email or password', loggedIn: false });
      return;
    }

    // Set session data
    // req.session.user = user;
    console.dir(req.session)
    req.session.login = true;

    // res.status(200).json({ message: 'User logged in successfully' });
    res.redirect('/cms');
    } catch (error) {
    console.error('Error logging in user:', error);
    // res.status(500).json({ error: 'Failed to login user' });
    res.render('login', { title: "Login", error: 'Failed to login user', loggedIn: false });
      
  }
}

export {
  createUser,
  loginUser
};
