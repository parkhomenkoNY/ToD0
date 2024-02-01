require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const config = require("./config/serverConfig");
const cors = require("cors");

const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/authRouter');
const tokensRouter = require('./src/routes/tokenRouter');
const apiNoteRouter = require('./src/routes/api/note.routes');

const app = express();
app.use(morgan('dev'));
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



config(app);

app.use('/api/tasks', apiNoteRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`App has been started in port ${PORT}...`);
});
