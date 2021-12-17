const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./connectionToDB/connection');

const app = express();

const { port } = require('./config');

app.use(morgan('common'));
app.use(cors());
app.use(express.json());

connectDB();

const userRoutes = require('./API/routes');

app.get('/', (req, res) => {
   res.send('Hello world');
});

app.use('/', userRoutes);

app.listen(port, () => console.log(`Server running on ${port}`));

