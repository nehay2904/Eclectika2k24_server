// importing the requirements

const express = require('express')
const app = express()
app.use(express.json())



const mongoose = require("mongoose")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const cors = require('cors')
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET, POST, PUT, DELETE",
  credentials:true
}))


require('dotenv').config();



const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const userModel = require('./schema/registration')
const merchModel = require('./schema/merchandise');
const sponsModel = require('./schema/spons');
const eventsModel = require('./schema/Mini_events');
const teamModel = require('./Team');
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

// app.get('/api/profile', async (req, res) => {
//   try {
//     // Retrieve the user's ID from the request object (assuming you're using authentication middleware)
//     const userId = req.user.id;
//     // Find the user in the database by their ID
//     const user = await userModel.findById(userId);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching user profile' });
//   }
// });

app.get("/merchendise", async (req, res) => {
  try {
    const merch = await merchModel.find({});
    res.send(merch);
    console.log(merch);
  } catch (err) {
    console.log(err);
  }
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

app.get("/get_spons", async (req, res) => {
  try {
    const spons = await sponsModel.find({});
    res.send(spons);
    console.log(spons);
  } catch (err) {
    console.log(err);
  }
});


app.post('/spons_data', async (req, res) => {
    const { spons_name, spons_url } = req.body;

    // Check if the user already exists
   
    // Create a new user
    const newUser = new sponsModel({
      spons_name,
      spons_url
    });

    // Save the user to the database
    await newUser.save();

 } )


 app.get("/get_events", async (req, res) => {
  try {
    const events = await eventsModel.find({});
    res.send(events);
    console.log(events);
  } catch (err) {
    console.log(err);
  }
});


app.post('/events_data', async (req, res) => {
    const { event_name, event_desc } = req.body;

    const newevent = new eventsModel({
      event_name,
      event_desc
    });

    // Save the user to the database
    await newevent.save();

 } )


 app.get("/get_team", async (req, res) => {
  try {
    const team = await teamModel.find({});
    res.send(team);
    console.log(team);
  } catch (err) {
    console.log(err);
  }
});


app.post('/team_data', async (req, res) => {
    const {team_name, team_position, img_url} = req.body;

    const newmember = new teamModel({
      team_name,
      team_position,
      img_url
    });

    // Save the user to the database
    await newmember.save();
    console.log(req.body)
  
 } )



app.get('/', (req, res) => {
  res.send("hello world")
})


app.listen(PORT, (req, res) => {
  console.log(`server is responding on ${PORT}`)
})