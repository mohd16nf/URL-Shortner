const express = require('express');
const { connectToMongoDb } = require('./connections');
const urlRoute = require('./routes/url');
const app = express();
const PORT = process.env.PORT || 8080;

connectToMongoDb(process.env.MONGO_URL ||'mongodb://127.0.0.1:27017/url-shortner')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
