const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
  console.log('#####ERROR HANDLER#####');
  console.log(error);
  res.sendStatus(500);
});

app.listen(3000, () => console.log(`Server started at http://localhost:3000`));
