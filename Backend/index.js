const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const productRoutes = require('./Routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://kashishjangid:kashishjangid123@cluster0.mbxux9e.mongodb.net/RoleBasedAuth')
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Import routes
app.get('/',(req, res)=>{
    res.send("Welcome to Role Based Authentication by Kashish Jangid");
})

app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

const Port = process.env.PORT || 5001;

app.listen(Port, () => {
  console.log(`Server is running on port localhost:${Port}`);
});


// admin credentials
// email: kashish.jangid@gonukkad.com
// password: Kashish@0411

// merchant credentials
// email: ankit.kumar@gonukkad.com
// password: Ankit@04