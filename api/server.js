const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
});

const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});
require('./routes/user.routes.js')(app);
require('./routes/note.routes.js')(app);
require('./routes/pizza.routes.js')(app);
require('./routes/topping.routes.js')(app);
require('./routes/pizza-topping.routes.js')(app);
require('./routes/basket.routes.js')(app);

let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
