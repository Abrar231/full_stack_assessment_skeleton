const express = require('express');
const cors = require('cors');
const { findAllUsers, findAllUsersRelatedToHome, updateUsersForHome } = require('./controllers/UserController');
const { findAllHomesRelatedToUser } = require('./controllers/HomeController');
const { allowedOrigin } = require('./config');
const app = express()
const port = 3000

const corsOptions = {
  origin: allowedOrigin,
}

app.use(express.json());
app.use(cors(corsOptions));

app.get('/user/find-all', findAllUsers);

app.get(`/home/find-by-user`, findAllHomesRelatedToUser);

app.get(`/user/find-by-home`, findAllUsersRelatedToHome);

app.put('/home/update-users', updateUsersForHome);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})