// node v18.19.1

const express = require('express');
const app = express();
const port = 80;

app.use(express.static('frontend/dist'));

app.listen(port, () => {
   console.log('Server listening on port 80...');
});
