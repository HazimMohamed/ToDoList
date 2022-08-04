express = require('express');
itemsInterface = require('./db-access');

app = express();

app.get('/todo', (req, res) => {
    res.send(itemsInterface.getAllItems());
});


app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});
