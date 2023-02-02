const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const routerWorkouts = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
const requireAuth = require('./middleware/requireAuth');
require('dotenv').config();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
const logRequest = (req, res, next) => {
	console.log(req.path, req.method);
	next();
};

// port
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
	//*Set static folder up in production
	app.use(express.static('frontend/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
}

// routes
app.get('/', logRequest, (req, res) => {
	res.json({ message: 'Welcome' });
});
app.use('/api/user', userRoutes);
app.use('/api/workouts', requireAuth, routerWorkouts);

// connect to the database
const start = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.MONGO_URI);
		// listen to requests
		app.listen(port, () => {
			console.log(
				`Connected to the database and server is listening at port ${port}`
			);
		});
	} catch (error) {
		console.log(error.message);
	}
};

start();
