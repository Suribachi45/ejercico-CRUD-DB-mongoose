const express = requier('express');
const app = express();
const PORT = 8080;
const routes = require('./routes');

const { dbConnection } = require('./config/config');

app.use(express.json());
app.use('/', routes);

dbConnection();



app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));