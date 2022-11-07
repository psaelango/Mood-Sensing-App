require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { errorHandler } = require('./middleware/error.middleware');
const logger = require('./logger');

const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./routes/moods.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use(errorHandler);

app.listen(port, () => logger.info(`Server running on port ${port}`));
