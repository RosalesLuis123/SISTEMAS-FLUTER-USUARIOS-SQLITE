const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
