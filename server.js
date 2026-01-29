



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const apiRoutes = require('./src/models/routes/apiRoutes');

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

app.use(BASE_URI, apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
    console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
});


