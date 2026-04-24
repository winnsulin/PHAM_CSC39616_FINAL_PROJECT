require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const User = require('./Users');
const authJwtController = require('./auth_jwt');

const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.DB)
  .then(() => console.log('server.js PHAM-FINAL-PROJECT Connected to MongoDB'))
  .catch(err => {
    console.error('server.js PHAM-FINAL-PROJECT MongoDB Connection Error:', err);
    process.exit(1);
  });

// Home route
app.get('/', (req, res) => {
    res.send('PHAM-FINAL-PROJECT is Live!');
});

// Routes
const bagRoutes = require('./routes/bag');
const router = express.Router();

app.use('/api/bag', bagRoutes);

// Signup
router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ success: false, msg: 'Username and password required.' });

  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    res.status(201).json({ success: true, msg:  'User created successfully.' });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ success: false, msg: 'Username already exists.' });
    else
      return res.status(500).json({ success: false, msg: err.message });
  }
});

// Signin
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select('name username password');
    if (!user) return res.status(401).json({ success: false, msg: 'User not found.' });

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ success: true, token: 'JWT ' + token });
    } else {
      res.status(401).json({ success: false, msg: 'Incorrect password.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});


// Use main router
app.use('/', router);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});