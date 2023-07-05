require('dotenv').config();
const app = require('./app');

const { db } = require('./database/config');
const initModel = require('./models/initModel');
db.authenticate()

  .then(() => console.log('Database authenticated 👍👍'))

  .catch((err) => console.log(err));

initModel();

db.sync()

  .then(() => console.log('Database synced'))

  .catch((err) => console.log(err));

//console.log(process);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT} 👌👌`);
});
