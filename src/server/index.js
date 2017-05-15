require('babel-register');
const hook = require('css-modules-require-hook');
require('dotenv').config();

hook({ extensions: '.scss' });
const app = require('./server');

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
