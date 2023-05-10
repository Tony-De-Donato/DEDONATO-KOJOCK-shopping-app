const express = require('express');

const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors({
    origin: '*',
}));

const kitsRoutes = require('./routes/kits');

app.use(kitsRoutes);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});