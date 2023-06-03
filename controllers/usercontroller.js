// Import the necessary modules
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Define the controller functions
async function register(data) {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = data;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return { error: "All input is required" };
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return { error: "User Already Exist. Please Login" };
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return user;
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}
async function login(data, res) {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = data;

    // Validate user input
    if (!(email && password)) {
      return { error: "All input is required" };
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // set the token in a cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true, // Set the "Secure" flag
      });

      // save user token
      user.token = token;

      // user token to routes
      return { token: token };
    }
    return { error: "Invalid Credentials" };
  } catch (err) {
    console.log(err);
  }
}
// Export the controller functions
module.exports = {
  register,
  login,
};
