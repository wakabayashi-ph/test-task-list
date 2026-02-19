const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
