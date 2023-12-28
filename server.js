// importing the requirements

const express = require('express')
const app = express()
app.use(express.json())



const mongoose = require("mongoose")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes/auth.js
const jwt = require('jsonwebtoken');

const cors = require('cors')
app.use(cors())

require('dotenv').config();



const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const userModel = require('./registration')
const merchModel = require('./merchandise')
// MONGODB_URI=mongodb+srv://neha2212:221200@cluster0.lhaoo6g.mongodb.net/test

//connection of mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connection is success')
}).catch((err) => {
  console.log(err)
})

app.get("/users", async (req, res) => {
  try {
    const user = await userModel.find({});
    res.send(user);
    console.log(user);

  } catch (err) {
    console.log(err);
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    // Retrieve the user's ID from the request object (assuming you're using authentication middleware)
    const userId = req.user.id;
    // Find the user in the database by their ID
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user profile' });
  }
});

app.get("/merchendise", async (req, res) => {
  try {
    const merch = await merchModel.find({});
    res.send(merch);
    console.log(merch);
  } catch (err) {
    console.log(err);
  }
});


app.post('/login', async (req, res) => {
  const { user_email, password } = req.body;

  const old_user = await userModel.findOne({ user_email: user_email, password: password });
  // Perform your own authentication logic here

  try {
    if (old_user) {
      res.status(200).json({ message: "you are logged in" });


    } else {
      res.status(401).json({ error: 'Invalid user email or password' });
    }
    ;


  } catch (error) {
    res.status(401).json({ error });
  }
});


app.post('/user_register', async (req, res) => {
  try {
    const { user_name, user_email, password, mobile_no, user_semester, user_branch, events } = req.body;

    // Check if the user already exists

    const existingUser = await userModel.findOne({ user_email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // Create a new user
    const newUser = new userModel({
      user_name,
      user_email,
      password,
      mobile_no,
      user_semester,
      user_branch,
      events
    });

    // Save the user to the database
    await newUser.save();


    const old_user = userModel.find()
    const token = jwt.sign({ userId: old_user.id }, "secretKey", { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// app.post('/read', async (req, res) => {

//   const { user_name, user_email, password, mobile_no, user_semester, user_branch, events } = req.body;
//   const old_user = await userModel.findOne();


//   try {
//     const user = await userModel.findById(
//       old_user._id,
//       { user_name, user_email, password, mobile_no, user_semester, user_branch, events }

//     );

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// });

app.put('/update', async (req, res) => {

  const { user_name, user_email, password, mobile_no, user_semester, user_branch, events } = req.body;
  const old_user = await userModel.findOne();


  try {
    const user = await userModel.findByIdAndUpdate(
      old_user._id,
      { user_name, user_email, password, mobile_no, user_semester, user_branch, events },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});
// 


app.delete('/delete', async (req, res) => {
  const old_user = await userModel.findByIdAndDelete();

  userModel.findByIdAndDelete(old_user._id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json('Item deleted successfully');
    }
  });
});


app.post('/merchendise_data', async (req, res) => {
  try {
    const { merch_name, merch_email, mobile_no, merch_semester, merch_branch, merch_type } = req.body;

    // Check if the user already exists

    const existingUser = await userModel.findOne({ merch_email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // Create a new user
    const newUser = new merchModel({
      merch_name,
      merch_email,
      mobile_no,
      merch_semester,
      merch_branch,
      merch_type
    });

    // Save the user to the database
    await newUser.save();


    const old_user = merchModel.find()
    const token = jwt.sign({ userId: old_user.id }, "secretKey", { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});





app.get('/', (req, res) => {
  res.send("hello world")
})


app.listen(PORT, (req, res) => {
  console.log(`server is responding on ${PORT}`)
})