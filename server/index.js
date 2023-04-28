require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/mainRouter");

app.use(cors());
app.use(express.json());
app.use('/api/v1', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});