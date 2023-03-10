const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const userRouter = require('./routes/users')

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})