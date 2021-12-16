const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { port } = require('./config');

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello world');
});

app.listen(port, () => console.log(`Server running on ${port}`));

